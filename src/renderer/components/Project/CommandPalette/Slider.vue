<template lang="pug">
el-slider.slider(v-model="input", :min="min", :max="max", show-input)
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {
  public input: number = 0

  @Prop()
  public value: number

  @Prop()
  public min: number

  @Prop()
  public max: number

  public mounted () {
    this.input = this.value
  }

  @Watch('input')
  public updateInput () {
    this.$emit('input', this.input)
  }
}
</script>


<style lang="sass">
.slider
  .el-slider__input
    width: 56px
    height: 28px
    line-height: 26px
    input
      height: 28px
      font-size: 11px
      padding-right: 20px
      padding-left: 2px
    .el-input-number__increase
      position: absolute
      z-index: 1
      top: 1px
      width: 20px
      height: auto
      text-align: center
      background: #f5f7fa
      color: #606266
      cursor: pointer
      font-size: 11px
      line-height: 13px
      border-left: 1px solid #dcdfe6
      border-bottom: 1px solid #dcdfe6
      border-radius: 0 4px 0 0
    .el-input-number__decrease
      position: absolute
      z-index: 1
      right: 1px
      top: auto
      left: auto
      bottom: 1px
      width: 20px
      height: auto
      text-align: center
      background: #f5f7fa
      color: #606266
      cursor: pointer
      font-size: 11px
      line-height: 13px
      border-right: none
      border-left: 1px solid #dcdfe6
      border-radius: 0 0 4px 0
  .el-slider__runway.show-input
    margin: 14px 72px 14px 11px
</style>
