<template lang="pug">
.editor-header
  el-button.nav-backward(type="text", @click="back") ‹ 戻る
  el-button.open(type="text", @click="open") 開く
  el-button.save(type="text", @click="save") 保存
  .filename {{ filename ? filename : '新規ファイル' }} を編集中
  el-button.test-play(type="text", @click="play", :disabled="disabled") テストプレイ
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'

@Component
export default class EditorHeader extends Vue {
  @Prop({ default: false })
  public disabled: boolean

  @Prop({ default: null })
  public filename: string | null

  public back () {
    ipcRenderer.send('cleanTestData')
    this.$router.push({ name: 'open-project' })
  }

  public open () {
    this.$emit('file-open-clicked')
  }

  public save () {
    this.$emit('file-save-clicked')
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
  .filename
    color: #333333
    font-size: 14px
    flex-grow: 1
    text-align: left
    margin: 0 20px
    line-height: 40px
</style>
