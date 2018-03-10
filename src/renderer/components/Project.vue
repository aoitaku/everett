<template lang="pug">
.project
  editor-header(@play-clicked="play", :content="selectedProject", :disabled="!canPlay")
  .middle
    command-palette
    editor(@input-changed="inputChanged")
    editor-result(@copy-clicked="copy", :content="parseResult", :disabled="!canCopy")

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

  public mounted () {
    if (!this.selectedProject) {
      this.$router.push({ name: 'open-project' })
      return
    }
    const title = document.title.split('-').slice(-1)[0].trim()
    document.title = `${this.projectNameFromPath(this.selectedProject)} - ${title}`
  }

  public canPlay () {
    return this.selectedProject && 0 < this.eventDataJSON.length
  }

  public canCopy () {
    return 0 < this.eventDataJSON.length
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

  public inputChanged (newValue: string, oldValue: string) {
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
