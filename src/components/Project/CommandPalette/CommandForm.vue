<template lang="pug">
.form
  template(v-if="showLabel")
    .label {{ signature.label }}
  template(v-if="type === 'select'")
    el-select(v-model="input", size="small")
      el-option(
        v-for="option in options.values",
        :value="option.value",
        :label="option.label",
        :key="option.value",
      )
  template(v-else-if="type === 'color'")
    color-editor(v-model="input")
  template(v-else-if="type === 'tone'")
    tone-editor(v-model="input")
  template(v-else-if="type === 'filename'")
    file-select(v-model="input", :media="options.name")
  template(v-else-if="type === 'spriteset'")
    .el-input-group
      .el-input-group__prepend
        file-select(v-model="input[0]", :media="options.name")
      el-input-number(
        v-model="input[1]",
        :min="options.minIndex",
        :max="options.maxIndex",
        size="small",
        controls-position="right",
      )
  template(v-else-if="type === 'volume'")
    slider(
      v-model="input",
      :min="options.min",
      :max="options.max",
    )
  template(v-else-if="type === 'number'")
    el-input-number(
      v-model="input",
      :min="options.min",
      :max="options.max",
      size="small",
      controls-position="right",
    )
  template(v-else-if="type === 'optional'")
    template(v-if="signature.value[0] === 'number'")
      optional-input-number(v-model="input")
    template(v-else-if="signature.value[0] === 'true'")
      el-switch(v-model="input[0]")
  template(v-else-if="type === 'tuple'")
    .row(v-for="(option, index) in values")
      .label {{ option[1].label }}
      template(v-if="option[0] === 'number'")
        el-input-number(
          v-model="input[index]",
          :min="option[1].min",
          :max="option[1].max",
          size="small",
          controls-position="right",
        )
      template(v-else-if="option[0] === 'variable'")
        variable-select(
          v-model="input[index]",
          :min="option[1].min",
          :max="option[1].max",
          size="small",
          controls-position="right",
        )
      template(v-else)
        el-input(v-model="input[index]", size="small")
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

<style lang="sass">
.form
  .el-input-group
    .el-select
      width: 190px
    .el-input-group__prepend + .el-input-number /deep/ .el-input__inner
      border-top-left-radius: 0
      border-bottom-left-radius: 0
</style>

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
