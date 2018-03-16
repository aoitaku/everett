<template lang="pug">
.editor
  textarea(ref="codemirror")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import CodeMirror from 'codemirror'
import { store } from '../../store'

@Component
export default class Editor extends Vue {
  public editor: CodeMirror.Editor
  public skipNextChangeEvent = false
  public sharedState = store.state

  public get source () {
    return this.sharedState.source
  }

  public get textarea () {
    return this.$refs.codemirror as HTMLTextAreaElement
  }

  public mounted () {
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'everett',
      lineNumbers: true,
      lineWrapping: true,
    })
    this.editor.setValue(this.sharedState.source)
    this.editor.on('change', this.inputChanged)
    this.editor.on('blur', this.unfocused)
  }

  public inputChanged (codemirror: CodeMirror.Editor) {
    if (this.skipNextChangeEvent) {
      this.skipNextChangeEvent = false
      return
    }
    store.updateSource(codemirror.getValue())
    this.sharedState.edited = true
  }

  public unfocused (codemirror: CodeMirror.Editor) {
    const cursors = document.querySelector('.CodeMirror-cursors') as HTMLElement
    cursors.style.visibility = 'visible'
  }

  @Watch('source')
  public contentChanged (newContent: string, oldContent: string) {
    const content = this.editor.getValue()
    if (newContent !== content) {
      this.skipNextChangeEvent = true
      const { left, top } = this.editor.getScrollInfo()
      this.editor.setValue(newContent)
      this.editor.scrollTo(left, top)
    }
  }
}
</script>

<style lang="sass">
.project
  .editor
    .CodeMirror-wrap
      height: 100%
      .CodeMirror-vscrollbar
        &::-webkit-scrollbar
          width: 5px
        &::-webkit-scrollbar-track 
          background-color: #eee
        &::-webkit-scrollbar-thumb 
          background-color: rgba(95, 95, 95, 0.5)
          border-radius: 5px
      .CodeMirror-code
        font-size: 14px
        font-family: Menlo, Monaco, Consolas, "Courier New", "メイリオ", monospace
    .cm-operator
      color: #3f51b5
    .cm-symbol
      color: #F44336
    .cm-command
      color: #2196f3
    .cm-number
      color: #F44336
    .cm-keyword
      color: #009688
    .cm-attribute
      color: #2196f3
    .cm-string
      color: #3f51b5
    .cm-comment
      color: #aaaaaa

</style>
<style lang="sass" scoped>
.editor
  height: 100%
  flex-grow: 1
</style>
