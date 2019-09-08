<template lang="pug">
.form
  .label(v-if="showLabel") {{ signature.label }}
  el-select(v-if="type === 'select'", v-model="input", size="small")
    el-option(v-for="option in options.values", :value="option.value", :label="option.label", :key="option.value")
  color-editor(v-else-if="type === 'color'", v-model="input")
  tone-editor(v-else-if="type === 'tone'", v-model="input")
  file-select(v-else-if="type === 'filename'", v-model="input", :media="options.name")
  slider(v-else-if="type === 'volume'", v-model="input", :min="options.min", :max="options.max")
  el-input-number(v-else-if="type === 'number'", v-model="input", :min="options.min", :max="options.max", size="small", controls-position="right")
  template(v-else-if="type === 'optional'")
    el-switch(v-if="signature.value[0] === 'true'", v-model="input[0]")
    optional-input-number(v-else-if="signature.value[0] === 'number'", v-model="input")
  template(v-else-if="type === 'tuple'")
    .row(v-for="(option, index) in values")
      .label {{ option[1].label }}
      el-input-number(v-if="option[0] === 'number'" v-model="input[index]", :min="option[1].min", :max="option[1].max", size="small", controls-position="right")
      variable-select(v-else-if="option[0] === 'variable'" v-model="input[index]", :min="option[1].min", :max="option[1].max", size="small", controls-position="right")
      el-input(v-else, v-model="input[index]", size="small")

</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IParameterSignature } from '../../../commands/definitions'
import ColorEditor from './ColorEditor.vue'
import ToneEditor from './ToneEditor.vue'
import FileSelect from './FileSelect.vue'
import VariableSelect from './VariableSelect.vue'
import Slider from './Slider.vue'
import OptionalInputNumber from './OptionalInputNumber.vue'

@Component({
  components: {
    ColorEditor,
    ToneEditor,
    FileSelect,
    VariableSelect,
    Slider,
    OptionalInputNumber,
  },
})
export default class CommandForm extends Vue {
  public input: any = null

  @Prop()
  public value: any

  @Prop({
    default: true,
  })
  public showLabel!: boolean

  @Prop()
  public signature!: IParameterSignature

  public get type () {
    return this.signature.type
  }

  public get options () {
    return this.signature.value[1]
  }

  public get values () {
    return this.signature.values
  }

  public created () {
    this.input = this.value
  }

  @Watch('input')
  public updateInput () {
    this.$emit('input', this.input)
  }
}
</script>

<style lang="sass" scoped>
.form
  margin: 16px 0
  .row
    margin: 0 0 8px 0
  .label
    vertical-align: middle
    line-height: 24px
    min-width: 86px
    margin: 4px 8px 4px 2px
    display: inline-block
</style>
