<template lang="pug">
.project
  editor-header(
    @play-clicked="play",
    @file-save-clicked="save",
    @file-open-clicked="beforeOpen",
    :filename="filename",
    :disabled="!canPlay"
  )
  .middle
    command-palette
    editor(:content='source', @input-changed="inputChanged")
    editor-result(@copy-clicked="copy", :content="parseResult", :disabled="!canCopy")

  el-dialog(title="確認", ref="discardConfirmation", :visible.sync="confirmDiscarding")
    span 現在の変更内容が失われます。よろしいですか？
    span.dialog-footer(slot="footer")
      el-button(@click="discardCancelled()") いいえ
      el-button(type="primary", @click="discardConfirmed()") はい
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ipcRenderer, remote } from 'electron'
import path from 'path'
import * as fs from 'fs'
import { store } from '../store'
import * as Parser from '../parser'
import errorTransform from '../parser-error-transform'
import resultTransform, { describeResult } from '../parser-result-transform'
import CommandPalette from './Project/CommandPalette.vue'
import EditorHeader from './Project/EditorHeader.vue'
import Editor from './Project/Editor.vue'
import EditorResult from './Project/EditorResult.vue'
import { promisify } from 'util'

@Component({
  components: {
    CommandPalette,
    EditorHeader,
    Editor,
    EditorResult,
  },
})
export default class Project extends Vue {
  public sharedState = store.state
  public source: string = ''
  public edited = false
  public filename: string | null = null
  public confirmDiscarding = false
  public discard = false
  public busy = false
  public watcher: MutationObserver

  public get selectedProject () {
    return this.sharedState.selectedProject
  }

  public get eventDataJSON () {
    return this.sharedState.eventDataJSON
  }

  public set eventDataJSON (eventDataJSON) {
    this.sharedState.eventDataJSON = eventDataJSON
  }

  public get parseResult () {
    return this.sharedState.parseResult
  }

  public set parseResult (parseResult) {
    this.sharedState.parseResult = parseResult
  }

  public get discardConfirmation () {
    return (this.$refs.discardConfirmation as Vue).$el
  }

  public created () {
    this.watcher = new MutationObserver(() => {
      if (this.discardConfirmation.style.display === 'none') {
        this.discardConfirmationClosed()
      }
    })
  }

  public mounted () {
    if (!this.selectedProject) {
      this.$router.push({ name: 'open-project' })
      return
    }
    const title = document.title.split('-').slice(-1)[0].trim()
    document.title = `${this.projectNameFromPath(this.selectedProject)} - ${title}`
    this.watcher.observe(this.discardConfirmation, { attributes: true, attributeFilter: ['style'] })
  }

  public destroyed () {
    this.watcher.disconnect()
  }

  public canPlay () {
    return this.selectedProject && !this.busy && 0 < this.eventDataJSON.length
  }

  public canCopy () {
    return !this.busy && 0 < this.eventDataJSON.length
  }

  public play () {
    if (!this.selectedProject || !this.canCopy()) {
      return
    }
    const projectDir = path.dirname(this.selectedProject)
    const testEventData = path.join(projectDir, 'data/Test_Event.json')
    fs.writeFileSync(testEventData, this.eventDataJSON)
    ipcRenderer.send('runTestPlay', projectDir)
  }

  public async save () {
    if (!this.filename) {
      const file = remote.dialog.showSaveDialog({
        title: 'Save file',
        defaultPath: '.',
      })
      if (!file) {
        return
      }
      this.filename = file
    }
    await promisify(fs.writeFile)(this.filename, this.source, 'utf-8')
    this.edited = false
    this.$notify({
      title: '保存しました',
      message: `${this.filename} を更新しました。`,
      type: 'success'
    })
  }

  public beforeOpen () {
    if (this.edited) {
      this.busy = true
      this.confirmDiscarding = true
      return
    }
    this.open()
  }

  public open () {
    const files = remote.dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Open file',
      defaultPath: '.',
    })
    if (!files) {
      return
    }
    this.filename = files[0]
    this.source = fs.readFileSync(this.filename, 'utf-8')
    this.edited = false
  }

  public async copy () {
    if (!this.canCopy()) {
      return
    }
    const testEventBuffer = new Buffer(this.eventDataJSON, 'utf-8')
    await remote.clipboard.writeBuffer('application/rpgmv-EventCommand', testEventBuffer)
    this.$notify({
      title: 'クリップボードにコピーしました',
      message: 'イベントエディターの実行内容に貼り付けることができます',
      type: 'success'
    })
  }

  public discardConfirmationClosed () {
    if (this.discard) {
      this.discard = false
      this.open()
    }
    this.busy = false
  }

  public discardCancelled () {
    this.confirmDiscarding = false
  }

  public discardConfirmed () {
    this.confirmDiscarding = false
    this.discard = true
  }

  public inputChanged (newValue: string, oldValue: string) {
    this.edited = this.edited || newValue !== oldValue
    this.source = newValue
    try {
      const result = resultTransform(Parser.parse(newValue))
      this.eventDataJSON = JSON.stringify(result)
      this.parseResult = describeResult(result)
    } catch (err) {
      this.parseResult = errorTransform(err)
    }
  }

  private projectNameFromPath (projectPath: string) {
    if (!projectPath) {
      return ''
    }
    const systemFile = fs.readFileSync(`${path.dirname(projectPath)}/data/system.json`, 'utf-8')
    const systemData = JSON.parse(systemFile)
    if (!systemData) {
      return ''
    }
    return `${systemData.gameTitle} (${path.dirname(projectPath)})`
  }
}
</script>

<style lang="sass" scoped>
.project
  height: 100%
  .middle
    height: calc(100% - 40px)
    display: flex
</style>
