<template lang="pug">
.command-usage
  span.symbol @
  span.command {{ name }}
  span.parameterSignature(v-for="signature in signatures")
    | &ensp;
    span(v-if="signature.name")
      span.attribute {{ signature.name }}
      span.operator :
      | &nbsp;
    span.select(v-if="signature.type === 'select'")
      span
        i(:class="valueType(signature.value[0])") {{ signature.value[0] }}
      span(v-for="value in signature.value.slice(1)")
        | &ensp;|&nbsp;
        i(:class="valueType(value)") {{ value }}
    span.tuple(v-if="isTuple(signature.type)")
      span.operator [
      span
        i(:class="valueType(signature.value[0])") {{ signature.value[0] }}
      span(v-for="value in signature.value.slice(1)")
        | &nbsp;
        i(:class="valueType(value)") {{ value }}
      span.operator ]
    span.option(v-if="signature.type === 'option'")
      | (
      i(:class="valueType(signature.value)") {{ signature.value }}
      | )
    span.single(v-if="signature.value === 'filename'")
      i(class="filename") {{ signature.type }} file
    span.single(v-if="!signature.type")
      i(:class="valueType(signature.value)") {{ signature.value }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { IParameterSignature } from '../../../commands/definitions'

@Component
export default class CommandUsage extends Vue {
  @Prop()
  public name: string

  @Prop()
  public signatures: IParameterSignature[]

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
.command-usage
  text-indent: -0.5em
  padding: 10px calc(0.5em + 10px)
  margin: 0 0 10px 0
  background-color: #eeeeee
  border-radius: 4px
  font-size: 13px
  font-family: 'Menlo', 'consolas', monospace
</style>

<style lang="sass">
.command-usage
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
