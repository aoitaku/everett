<template lang="pug">
.command-help
  command-usage(:name="name", :signatures="parameterSignatures")
  command-preview(:item="item", :values="values")
  .row(v-for="(signature, index) in parameterSignatures", :key="index")
    template(v-if="isSingleInput(signature.type)")
      command-form(v-model="values[index]", :signature="signature")
    template(v-else-if="signature.type === 'or'")
      .label {{ signature.label }}
      el-radio-group(v-model="values[index][0]")
        template(v-for="value in signature.values")
          el-radio-button(:label="value.key", :key="value.key || 'default'")
            | {{ value.label }}
      .row(v-for="(value, i) in signature.values")
        command-form(
          v-model="values[index][1][value.key || 'default']",
          :signature="value",
          :show-label="false",
          :style="visibleIfEqual(value.key, values[index][0])",
        )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import CommandUsage from './CommandUsage.vue'
import CommandPreview from './CommandPreview.vue'
import CommandForm from './CommandForm.vue'
import Slider from './Slider.vue'
import { ICommandDefinition, IParameterSignature } from '../../../commands/definitions'
import { store } from '../../../store'

@Component({
  components: {
    CommandUsage,
    CommandPreview,
    CommandForm,
    Slider,
  },
})
export default class CommandHelp extends Vue {
  @Prop({ default: {
    name: '',
    title: '',
    example: '',
    parameterSignatures: [],
  } })
  public item!: ICommandDefinition

  public values: { [key: number]: string | number | number[] | boolean } = {}

  public get name () {
    return this.item.name
  }

  public get title () {
    return this.item.title
  }

  public get files () {
    return store.state.files
  }

  public get parameterSignatures () {
    return this.item.parameterSignatures
  }

  public isSingleInput (type: string) {
    switch (type) {
      case 'select':
      case 'optional':
      case 'filename':
      case 'vector':
      case 'tone':
      case 'color':
      case 'volume':
      case 'number':
        return true
    }
    return false
  }

  public defaultValueForSignature (signature: IParameterSignature): any {
    switch (signature.type) {
      case 'tone':
      case 'color':
      case 'vector':
        return signature.values.map((value: [any, { default: number }]) => value[1].default)
      case 'select':
        return signature.value[1].values[0].value
      case 'filename':
        return null
      case 'optional':
        if (signature.value[1]) {
          return [false, signature.value[1].default]
        }
        return [false, null]
      case 'or':
        const keyedValues = signature.values.filter(({ key }: IParameterSignature) => key)
        return [undefined, {
          default: this.defaultValueForSignature(signature.values[0]),
          ...keyedValues.reduce((prev: { [key: string]: any }, keyedValue: IParameterSignature) => {
            return {
              ...prev,
              [keyedValue.key]: this.defaultValueForSignature(keyedValue),
            }
          }, {}),
        }]
      default:
        return signature.value[1].default
    }
  }

  public created () {
    this.values = this.item.parameterSignatures.reduce((prev, signature, index) => {
      const defaultValue = this.defaultValueForSignature(signature)
      return { ...prev, [index]: defaultValue }
    }, this.values)
  }

  public visibleIfEqual (a?: string, b?: string ) {
    return { display: (a || 'default') === (b || 'default') ? 'block' : 'none' }
  }
}
</script>

<style lang="sass" scoped>
.command-help
  margin: 10px 10px 20px
  .row
    margin: 8px 0
    .label
      vertical-align: middle
      line-height: 24px
      min-width: 86px
      margin: 4px 8px 4px 2px
      display: inline-block
</style>

<style lang="sass">
.command-help
  .option
    .el-input-number
      width: 214px
      .el-input-group.el-input
        display: inline-table
        .el-input-group__prepend
          padding: 0 10px
</style>
