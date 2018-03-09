<template lang="pug">
#editor
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import * as ace from 'brace'

@Component
export default class Editor extends Vue {
  public editor: ace.Editor

  public mounted () {
    this.editor = ace.edit('editor')
    this.editor.getSession().setMode('ace/mode/everett')
    this.editor.setOptions({
      fontSize: '14px',
      fontFamily: 'ime_jp_rp, Menlo, Consolas, メイリオ, monospace',
      fixedWidthGutter: true,
    })
    this.editor.$blockScrolling = Infinity
    this.editor.setTheme('ace/theme/textmate')
    this.editor.getSession().on('change', () => {
      this.$emit('input-changed', this.editor.getValue())
    })
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'ime_jp_rp'
  src: url('../../assets/ime_jp_rp.woff') format('woff')
.project
  #editor
    .ace_scrollbar-v
      &::-webkit-scrollbar
        width: 5px
      &::-webkit-scrollbar-track 
        background-color: #eee
      &::-webkit-scrollbar-thumb 
        background-color: rgba(95, 95, 95, 0.5)
        border-radius: 5px
    .ace_operator
      color: #3f51b5
    .ace_symbol
      color: #F44336
    .ace_command
      color: #2196f3
    .ace_number
      color: #F44336
    .ace_keyword
      color: #009688
    .ace_attribute
      color: #2196f3
    .ace_string
      color: #009688

</style>
<style lang="sass" scoped>
#editor
  height: 100%
  flex-grow: 1
</style>
