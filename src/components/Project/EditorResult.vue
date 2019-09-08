<template lang="pug">
.editor-result
  .content
    .error(v-if="sharedState.parseError !== ''")
      | {{ sharedState.parseError }}
    .descriptions(v-else)
      .description(v-for="description in sharedState.parseResult")
        | {{ description.prefix }}
        span(:class="description.color") {{ description.content }}
        span(v-if="description.text", class="text") {{ description.text }}
        span(v-if="description.option", class="option") {{ description.option }}
  toolbar(position="bottom")
    el-button(type="text", size="mini", @click="copy")
      | イベントコマンド形式でクリップボードにコピー
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Toolbar from './Toolbar.vue'
import { remote } from 'electron'
import { store } from '../../store'

@Component({
  components: {
    Toolbar,
  },
})
export default class EditorResult extends Vue {
  public sharedState = store.state

  public async copy () {
    if (this.sharedState.busy || this.sharedState.eventDataJSON.length < 1) {
      return
    }
    const testEventBuffer = new Buffer(this.sharedState.eventDataJSON, 'utf-8')
    await remote.clipboard.writeBuffer('application/rpgmv-EventCommand', testEventBuffer)
    this.$notify({
      title: 'クリップボードにコピーしました',
      message: 'イベントエディターの実行内容に貼り付けることができます',
      type: 'success'
    })
  }
}
</script>

<style lang="sass" scoped>
.editor-result
  width: 480px
  height: 100%
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
    .screen
      color: olive
    .wait
      color: crimson
    .picture
      color: purple
    .audioVideo
      color: teal
    .changeBackground
      color: deeppink
    .system
      color: dodgerblue
    .message
      color: indigo
    .text
      color: navy
    .option
      color: gray
</style>
