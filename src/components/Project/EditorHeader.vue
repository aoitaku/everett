<template lang="pug">
.editor-header
  el-button.nav-backward(type="text", @click="beforeBack") ‹ 戻る
  el-button.open(type="text", @click="beforeOpen") 開く
  save
  .filename {{ filename }} を編集中
  test-play

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
import * as fs from 'fs'
import { store } from '@/store'
import Save from './EditorHeader/Save.vue'
import TestPlay from './EditorHeader/TestPlay.vue'
import EventBus from '@/event-bus'

@Component({
  components: {
    Save,
    TestPlay,
  },
})
export default class EditorHeader extends Vue {
  public sharedState = store.state
  public watcher!: MutationObserver
  public confirmDiscarding = false
  public discard = false
  public task: (() => void) | null = null

  public get discardConfirmation () {
    return (this.$refs.discardConfirmation as Vue).$el as HTMLElement
  }

  public get filename () {
    return this.sharedState.selectedFile ? this.sharedState.selectedFile : '新規ファイル'
  }

  public created () {
    this.watcher = new MutationObserver(() => {
      if (this.discardConfirmation.style.display === 'none') {
        this.discardConfirmationClosed()
      }
    })
  }

  public mounted () {
    this.watcher.observe(this.discardConfirmation, {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  public destroyed () {
    this.watcher.disconnect()
  }

  public beforeBack () {
    if (this.sharedState.edited) {
      this.sharedState.busy = true
      this.confirmDiscarding = true
      this.task = this.back
      return
    }
    this.back()
  }

  public back () {
    ipcRenderer.send('cleanTestData')
    store.initState()
    this.$router.push({ name: 'open-project' })
  }

  public beforeOpen () {
    if (this.sharedState.edited) {
      this.sharedState.busy = true
      this.confirmDiscarding = true
      this.task = this.open
      return
    }
    this.open()
  }

  public async open () {
    const { filePaths } = await remote.dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Open file',
      defaultPath: '.',
    })
    if (!filePaths) {
      return
    }
    this.sharedState.selectedFile = filePaths[0]
    store.updateSource(fs.readFileSync(this.sharedState.selectedFile, 'utf-8'))
    EventBus.$emit('insert-command-clicked', store.state.source)
    this.sharedState.edited = false
  }

  public discardConfirmationClosed () {
    const task = this.task
    this.task = null
    if (this.discard) {
      this.discard = false
      if (task) {
        task()
      }
    }
    this.sharedState.busy = false
  }

  public discardCancelled () {
    this.confirmDiscarding = false
  }

  public discardConfirmed () {
    this.confirmDiscarding = false
    this.discard = true
  }
}
</script>

<style lang="sass" scoped>
.editor-header
  box-sizing: border-box
  width: 100%
  height: 40px
  display: flex
  justify-content: stretch
  border-bottom: 1px solid #aaaaaa
  .el-button
    margin: 0 20px
  .filename
    color: #333333
    font-size: 14px
    flex-grow: 1
    text-align: left
    margin: 0 20px
    line-height: 40px
</style>
