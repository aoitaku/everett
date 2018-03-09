<template lang="pug">
.editor-result
  .content
    | {{ content }}
  toolbar(position="bottom")
    el-button(type="text", size="mini", @click="copyClicked", :disabled="disabled")
      | イベントコマンド形式でクリップボードにコピー
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Toolbar from './Toolbar.vue'

@Component({
  components: {
    Toolbar,
  },
})
export default class EditorResult extends Vue {
  @Prop({ default: '' })
  public content: string

  @Prop({ default: false })
  public disabled: boolean

  public copyClicked () {
    this.$emit('copy-clicked')
  }
}
</script>

<style lang="sass" scoped>
.editor-result
  width: 480px
  height: 100%
  flex-grow: 0
  border-left: 1px solid #cccccc
  .toolbar
    .el-button
      margin: 0 10px
  .content
    padding: 8px 10px
    box-sizing: border-box
    width: 100%
    font-size: 14px
    font-family: 'Menlo', 'consolas', 'メイリオ', monospace
    word-wrap: break-word
    word-break: break-all
    white-space: pre-wrap
    height: calc(100% - 29px)
    overflow-y: scroll
    &::-webkit-scrollbar
      width: 5px
    &::-webkit-scrollbar-track 
      background-color: #eee
    &::-webkit-scrollbar-thumb 
      background-color: rgba(95, 95, 95, 0.5)
      border-radius: 5px
</style>
