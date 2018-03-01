<template lang="pug">
.editor
  el-input(type="textarea", v-model="input")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class Editor extends Vue {
  public input = ''

  @Watch('input')
  public inputChanged (newValue: string, oldValue: string) {
    this.$emit('input-changed', newValue, oldValue)
  }
}
</script>

<style lang="sass">
.project
  .editor
    textarea.el-textarea__inner
      font-family: 'Menlo', 'consolas', 'メイリオ', monospace
      resize: none
      height: 100%
      outline: none
      border: none
      &::-webkit-scrollbar
        width: 5px
      &::-webkit-scrollbar-track 
        background-color: #eee
      &::-webkit-scrollbar-thumb 
        background-color: rgba(95, 95, 95, 0.5)
        border-radius: 5px
</style>
<style lang="sass" scoped>
.editor
  height: 100%
  .el-textarea
    height: 100%
  flex-grow: 1
</style>
