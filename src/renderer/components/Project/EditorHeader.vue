<template lang="pug">
.editor-header
  el-button.nav-backward(type="text", @click="back") ‹ 戻る
  el-button.open(type="text", @click="open") 開く
  el-button.save(type="text", @click="save") 保存
  .file-name {{ filename ? filename : '新規ファイル' }} を編集中
  el-button.test-play(type="text", @click="play", :disabled="disabled") テストプレイ
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { ipcRenderer, remote } from 'electron'

@Component
export default class EditorHeader extends Vue {
  @Prop({ default: '' })
  public content: string

  @Prop({ default: false })
  public disabled: boolean

  public filename: string | null = null

  public back () {
    ipcRenderer.send('cleanTestData')
    this.$router.push({ name: 'open-project' })
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
    this.$emit('file-opened', this.filename)
  }

  public save () {
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
    this.$emit('file-saving', this.filename)
  }

  public play () {
    this.$emit('play-clicked')
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
  .file-name
    color: #333333
    font-size: 14px
    flex-grow: 1
    text-align: left
    margin: 0 20px
    line-height: 40px
</style>
