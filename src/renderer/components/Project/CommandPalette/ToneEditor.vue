<template lang="pug">
.tone-editor
  .input
    el-slider(v-model="tone[0]",  :min="-255", :max="255", show-input)
    el-slider(v-model="tone[1]", :min="-255", :max="255", show-input)
    el-slider(v-model="tone[2]", :min="-255", :max="255", show-input)
    el-slider(v-model="tone[3]", :min="0", :max="255", show-input)
  .preview
    img(ref="image", src="~@/assets/printertest.png")
    canvas(ref="canvas")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class ToneEditor extends Vue {

  @Prop()
  public value: string

  public tone: [number, number, number, number] = [0, 0, 0, 0]

  public get canvas () {
    return this.$refs.canvas as HTMLCanvasElement
  }

  public get image () {
    return this.$refs.image as HTMLImageElement
  }

  public fill (context: CanvasRenderingContext2D, blend: string, color: string, width: number, height: number) {
    context.globalCompositeOperation = blend
    context.fillStyle = color
    context.fillRect(0, 0, width, height)
  }

  @Watch('tone')
  public updateTone () {
    const canvas = this.canvas
    const context2d = canvas.getContext('2d')
    if (!context2d) {
      return
    }
    const image = this.image
    const { naturalWidth, naturalHeight } = this.image
    const height = 125
    const width = Math.ceil(height * naturalWidth / naturalHeight)
    canvas.width = width
    canvas.height = height

    context2d.globalCompositeOperation = 'copy'
    context2d.drawImage(image, 0, 0, width, height)

    const gray = Math.max(0, this.tone[3])
    this.fill(context2d, 'saturation', `rgba(255, 255, 255, ${gray / 255})`, width, height)

    const rgb1 = this.tone.slice(0, 3).map((tone) => Math.max(0, tone))
    this.fill(context2d, 'lighter', `rgb(${rgb1.join(', ')})`, width, height)

    this.fill(context2d, 'difference', 'white', width, height)
    const rgb2 = this.tone.slice(0, 3).map((tone) => Math.max(0, -tone))
    this.fill(context2d, 'lighter', `rgb(${rgb2.join(', ')})`, width, height)
    this.fill(context2d, 'difference', 'white', width, height)

    this.$emit('input', this.tone.join(' '))
  }
}
</script>

<style lang="sass" scoped>
.tone-editor
  display: flex
  .input
    flex-grow: 1
  .preview
    flex-grow: 0
    position: relative
    border: 1px solid #cccccc
    padding: 1px
    margin: 3px 0 4px 8px
    height: 125px
    img
      width: auto
      height: 100%
      display: block
    canvas
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: 1px
</style>

<style lang="sass">
.tone-editor
  .input
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
