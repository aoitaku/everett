<template lang="pug">
.command-palette(:class="compacted ? 'compacted' : ''")
  el-tabs(tab-position="left", style="height: 100%", @tab-click="tabSelected")
    el-tab-pane(ref="defaultTabPane")
      icon.message(slot="label", name="comment")
      h1 メッセージ
      ul
        li
          | コマンド行（
          code @
          | ）
        li
          | プラグインコマンド行（
          code %
          | ）
        li
          | キャラクター名設定行（
          code &gt;
          | ）
      p 以外はすべてメッセージ行になります。
      p 空行でメッセージウィンドウの改ページを行います。
      p
        code ~
        | ではじまる行は、
        code ~
        | を取り除いた以降のテキストがメッセージとして扱われます。
      p
        | メッセージ中に空行を表示したい場合は
        code ~
        | のみの行を入力してください。
      el-collapse
        el-collapse-item(
          :title="showTextCommand.title",
          :name="showTextCommand.name",
        )
          command-help(:item="showTextCommand")
      h1 キャラクター名設定行
      p
        code &gt;
        | &nbsp;で始まる行はキャラクター名設定行になります。
    el-tab-pane
      icon.basic(slot="label", name="calculator")
      h1 コマンド
      p
        code @
        | &nbsp;で始まる行はコマンド行になります。
      h1 基本
      el-collapse
        el-collapse-item(
          v-for="item in basicCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.screen(slot="label", name="desktop")
      h1 画面効果
      el-collapse
        el-collapse-item(
          v-for="item in screenCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.image(slot="label", name="image")
      h1 画像
      el-collapse
        el-collapse-item(
          v-for="item in imageCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.audio(slot="label", name="music")
      h1 オーディオ
      el-collapse
        el-collapse-item(
          v-for="item in audioCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.video(slot="label", name="film")
      h1 ビデオ
      el-collapse
        el-collapse-item(
          v-for="item in videoCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.system(slot="label", name="cog")
      h1 システム
      el-collapse
        el-collapse-item(
          v-for="item in systemCommands",
          :title="item.title", :name="item.name", :key="item.name")
          command-help(:item="item")
    el-tab-pane
      icon.plugin(slot="label", name="puzzle-piece")
      h1 プラグインコマンド
      p
        code %
        | &nbsp;で始まる行はプラグインコマンド行になります。

</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import CommandHelp from './CommandPalette/CommandHelp.vue'
import { commandDefinitions } from '@/commands/definitions'

const basicCommandCodes = [230]
const screenCommandCodes = [221, 222, 223, 224, 225, 236]
const imageCommandCodes = [231, 232, 233, 234, 235, 284]
const audioCommandCodes = [241, 242, 243, 244, 245, 246, 249, 250, 251]
const videoCommandCodes = [261]
const systemCommandCodes = [352, 353, 354]

@Component({
  components: {
    CommandHelp,
  },
})
export default class CommandPalette extends Vue {
  public compacted = false

  private lastSelectedTabPane!: Vue

  public get commandDefinitions () {
    return commandDefinitions
  }

  public get showTextCommand () {
    return this.commandDefinitions[101]
  }
  public get basicCommands () {
    return basicCommandCodes.map((code) => this.commandDefinitions[code])
  }
  public get screenCommands () {
    return screenCommandCodes.map((code) => this.commandDefinitions[code])
  }
  public get imageCommands () {
    return imageCommandCodes.map((code) => this.commandDefinitions[code])
  }
  public get audioCommands () {
    return audioCommandCodes.map((code) => this.commandDefinitions[code])
  }
  public get videoCommands () {
    return videoCommandCodes.map((code) => this.commandDefinitions[code])
  }
  public get systemCommands () {
    return systemCommandCodes.map((code) => this.commandDefinitions[code])
  }

  public mounted () {
    this.lastSelectedTabPane = this.$refs.defaultTabPane as Vue
  }

  public tabSelected (tabPane: Vue, event: Event) {
    if (this.lastSelectedTabPane === tabPane) {
      this.compacted = !this.compacted
      this.$emit('side-panel-changed')
    } else {
      this.lastSelectedTabPane = tabPane
      this.compacted = false
    }
  }

  public insertCommandClicked (content: string) {
    this.$emit('insert-command-clicked', content)
  }
}
</script>

<style lang="sass" scoped>
.command-palette
  width: 400px
  max-height: 100%

  flex-shrink: 0
  border-right: 1px solid #cccccc
  transition-duration: 100ms
  .fa-icon
    width: auto
    vertical-align: middle
    &.message
      height: 1.2em
      margin: -0.2em 0 0.2em
    &.screen
      height: 1.0em
      margin: -0.1em 0.05em 0.1em -0.05em
    &.audio
      height: 1.1em
      margin: -0.1em 0.1em 0.1em -0.1em
    &.plugin
      height: 1.2em
      margin: -0.1em -0.05em 0.1em 0.05em
  .el-tab-pane
    margin: 0
    h1
      margin: 0
      font-size: 14px
      font-weight: normal
      padding: 10px 10px 8px
    p, ul
      margin: 0 10px 10px
      padding: 0
      font-size: 12px
      li
        margin-left: 20px
      code
        display: inline-block
        background-color: #eee
        line-height: 1.5
        padding: 2px 5px 0px
        border-radius: 4px
  &.compacted
    width: 47px
</style>

<style lang="sass">
.command-palette
  .el-tabs--left
    .el-tabs__header
      width: 48px
      margin: 0
    .el-tabs__content
      height: 100%
      overflow-y: scroll
      &::-webkit-scrollbar
        width: 5px
      &::-webkit-scrollbar-track
        background-color: #eee
      &::-webkit-scrollbar-thumb
        background-color: rgba(95, 95, 95, 0.5)
        border-radius: 5px
      .el-collapse-item__header
        padding-left: 11px
    .el-tabs__item
      &.is-left
        padding: 0 2px
        text-align: center
        user-select: none
      &:focus.is-active.is-focus:not(:active)
        box-shadow: none
</style>
