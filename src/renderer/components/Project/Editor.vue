<template lang="pug">
.editor
  textarea(ref="codemirror")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import CodeMirror from 'codemirror'

@Component
export default class Editor extends Vue {

  public editor: CodeMirror.Editor
  public content = ''
  public skipNextChangeEvent = false

  public get textarea () {
    return this.$refs.codemirror as HTMLTextAreaElement
  }

  public mounted () {
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'everett',
      lineNumbers: true,
      lineWrapping: true,
    })
    this.editor.setValue(this.content)
    this.editor.on('change', (codemirror) => {
      if (this.skipNextChangeEvent) {
        this.skipNextChangeEvent = false
        return
      }
      this.content = codemirror.getValue()
      this.$emit('input-changed', codemirror.getValue())
    })
  }

  @Watch('content')
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
      color: #009688

</style>
<style lang="sass" scoped>
.editor
  height: 100%
  flex-grow: 1
</style>
