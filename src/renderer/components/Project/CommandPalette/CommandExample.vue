<template lang="pug">
.command-example
  p 呼び出し例：
  .code(ref="code")
    span.symbol @
    span.command {{ item.name }}
    span.parameterSignature(v-for="(signature, index) in parameterSignatures")
      span(v-if="signature.name")
        | &ensp;
        span.attribute {{ signature.name }}
        span.operator :
      span.select(v-if="signature.type === 'select'")
        | &ensp;
        span.keyword {{ values[index] || signature.value[0] }}
      span.tuple(v-if="isTuple(signature.type)")
        | &ensp;
        span.operator [
        span.number {{ values[index] || signature.value.map(() => 0).join(' ') }}
        span.operator ]
      span.option(v-if="signature.type === 'option' && values[index]")
        | &ensp;
        span(:class="valueType(signature.value)") {{ signature.value }}
      span.single(v-if="signature.value === 'filename'")
        | &ensp;
        span.filename {{ values[index] || '"ファイル名"' }}
      span.single(v-if="!signature.type")
        | &ensp;
        span(:class="valueType(signature.value)") {{ values[index] || 0 }}
  el-button(@click="insertCommandClicked")
    icon(name="clipboard")
</template>

<script lang="ts">
import Vue from 'vue'
import { remote } from 'electron'
import { Component, Prop } from 'vue-property-decorator';
import { ICommandDefinition } from '../../../commands/definitions'

@Component
export default class CommandExample extends Vue {
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

  public insertCommandClicked () {
    remote.clipboard.writeText(this.example)
    this.$notify({
      title: 'クリップボードにコピーしました',
      message: 'シナリオエディター上に貼り付けることができます',
      type: 'success'
    })
  }

  public isTuple (type: string) {
    switch (type) {
    case 'color':
    case 'tone':
    case 'point':
    case 'size':
      return true
    }
    return false
  }

  public valueType (value: string) {
    switch (value) {
    case 'string':
    case 'number':
      return value
    default:
      return 'keyword'
    }
  }
}
</script>

<style lang="sass" scoped>
.command-example
  font-size: 12px
  p
    line-height: 1.8
    margin: 0 0 0 2px
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
  .el-button
    padding: 8px 10px
</style>
