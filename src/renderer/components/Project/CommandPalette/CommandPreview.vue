<template lang="pug">
.command-preview
  .header
    p コマンドプレビュー
    el-button(type="text", @click="insertCommandClicked")
      icon(name="clipboard")
      | コピー
  .code(ref="code")
    span.symbol @
    span.command {{ item.name }}
    span.parameterSignature(v-for="value in valuesWithDefaults")
      | &ensp;
      span(v-if="value.name")
        span.attribute {{ value.name }}
        span.operator :
        | &ensp;
      parameter(v-if="typeof value.value === 'string'" :value="value.value") {{ value.value }}
      span(v-else)
        | [
        span(v-for="(v, i) in value.value")
          span(v-if="i > 0") &ensp;
          parameter(:value="v") {{ v }}
        | ]
</template>

<script lang="ts">
import Vue from 'vue'
import { remote } from 'electron'
import { Component, Prop } from 'vue-property-decorator';
import { ICommandDefinition } from '../../../commands/definitions'
import Parameter from './Parameter.vue'

@Component({
  components: {
    Parameter,
  }
})
export default class CommandPreview extends Vue {
  @Prop()
  public values: string[]

  @Prop()
  public item: ICommandDefinition

  public get parameterSignatures () {
    return this.item.parameterSignatures
  }

  public get example () {
    return ((this.$refs.code as HTMLElement).textContent || '').replace(/\s+/g, ' ')
  }

  public get valuesWithDefaults () {
    return this.parameterSignatures.map ((signature, index) => {
      let value: string | string[] | null = null
      switch (this.type(signature.type || '')) {
      case 'select':
        value = this.values[index] || signature.value[0]
        break
      case 'list':
        value = this.values[index] || (signature.value as string[]).map(() => '0')
        break
      case 'option':
        value = this.values[index] ? signature.value : null
        break
      case 'filename':
        value = this.values[index] || '"ファイル名"'
        break
      default:
        value = this.values[index] || '0'
      }
      if (signature.name) {
        return {
          name: signature.name,
          value,
        }
      }
      return { value }
    }).filter(({ value }) => value !== null)
  }

  public insertCommandClicked () {
    remote.clipboard.writeText(this.example)
    this.$notify({
      title: 'クリップボードにコピーしました',
      message: 'シナリオエディター上に貼り付けることができます',
      type: 'success'
    })
  }

  public type (type: string) {
    if (!type) {
      return 'other'
    }
    switch (type) {
    case 'color':
    case 'tone':
    case 'point':
    case 'size':
      return 'list'
    case 'select':
    case 'option':
      return type
    default:
      return 'filename'
    }
  }
}
</script>

<style lang="sass" scoped>
.command-preview
  font-size: 12px
  .header
    display: flex
    align-items: center
    justify-content: space-between
    p
      line-height: 1.8
      margin: 0 0 0 2px
    .el-button
      font-size: 12px
      .fa-icon
        width: auto
        vertical-align: middle
        height: 1.2em
        margin: -0.1em 0.3em 0 0.5em
  .code
    font-family: "Menlo", "consolas", monospace
    .operator
      color: #3f51b5
    .symbol
      color: #F44336
    .command
      color: #2196f3
    .number
      color: #F44336
    .keyword
      color: #009688
    .attribute
      color: #2196f3
    .string
      color: #3f51b5
    .filename
      color: #3f51b5
</style>
