<template lang="pug">
.command-preview
  .header
    p コマンドプレビュー
    el-button(type="text", @click="insertCommandClicked")
      icon(name="code")
      | エディタにコピー
  .code(ref="code")
    span.symbol @
    span.command {{ item.name }}
    span.parameterSignature(v-for="parameter in normalizedValues")
      | &ensp;
      span(v-if="parameter.key")
        span(v-if="typeof parameter.value !== 'boolean'")
          span.attribute {{ parameter.key }}
          span.operator :
          | &ensp;
      parameter(v-if="typeof parameter.value === 'string' || typeof parameter.value === 'number'" :value="parameter.value") {{ parameter.value }}
      span(v-else-if="typeof parameter.value === 'boolean'")
        span.attribute(v-if="parameter.value") {{ parameter.key }}
      span(v-else)
        | [
        span(v-for="(value, index) in parameter.value")
          span(v-if="index > 0") &ensp;
          parameter(:value="value") {{ value }}
        | ]
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { ICommandDefinition } from '../../../commands/definitions'
import Parameter from './Parameter.vue'
import EventBus from '../../../event-bus'

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

  public example () {
    return ((this.$refs.code as HTMLElement).textContent || '').replace(/\s+/g, ' ')
  }

  public get normalizedValues () {
    return this.parameterSignatures.map ((signature, index) => {
      let key = signature.key
      let value: string | string[] | boolean
      switch (this.type(signature.type || '')) {
      case 'select':
        value = this.values[index] || signature.value[1].values[0].value
        break
      case 'list':
        value = this.values[index] || signature.values.map(() => '0')
        break
      case 'or':
        key = this.values[index][0]
        value = this.values[index][1][key || 'default'] || signature.values[0].values.map(() => '0')
        break
      case 'optional':
        if (this.values[index][0] && this.values[index][1] !== null) {
          value = this.values[index][1]
        } else {
          value = this.values[index][0]
        }
        break
      case 'filename':
        value = this.values[index] || '"ファイル名"'
        break
      default:
        value = this.values[index] || '0'
      }
      if (key) {
        return {
          key,
          value,
        }
      }
      return { value }
    }).filter(({ value }) => value !== null)
  }

  public insertCommandClicked () {
    EventBus.$emit('insert-command-clicked', this.example())
  }

  public type (type: string) {
    if (!type) {
      return 'other'
    }
    switch (type) {
    case 'color':
    case 'tone':
    case 'vector':
      return 'list'
    case 'or':
    case 'select':
    case 'optional':
      return type
    case 'filename':
      return 'filename'
    default:
      return type
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
        margin: -0.2em 0.3em 0.1em 0.5em
  .code
    text-indent: -0.5em
    padding: 0 0 0 0.5em
    height: 6em
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
