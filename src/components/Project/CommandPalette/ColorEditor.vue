<template lang="pug">
.color-editor
  .input
    slider(v-model="color[0]",  :min="0", :max="255", show-input)
    slider(v-model="color[1]", :min="0", :max="255", show-input)
    slider(v-model="color[2]", :min="0", :max="255", show-input)
    slider(v-model="color[3]", :min="0", :max="255", show-input)
  .preview
    img(ref="image", src="~@/assets/printertest.png")
    canvas(ref="canvas")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Slider from './Slider.vue'

@Component({
  components: {
    Slider,
  },
})
export default class colorEditor extends Vue {

  @Prop()
  public value!: [number, number, number, number]

  public color: [number, number, number, number] = [0, 0, 0, 0]

  public get canvas () {
    return this.$refs.canvas as HTMLCanvasElement
  }

  public get image () {
    return this.$refs.image as HTMLImageElement
  }

  public created () {
    this.color = [...this.value] as [number, number, number, number]
  }

  public fill (context: CanvasRenderingContext2D, blend: string, color: string, width: number, height: number) {
    context.globalCompositeOperation = blend
    context.fillStyle = color
    context.fillRect(0, 0, width, height)
  }

  @Watch('color')
  public updateColor () {
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

    const rgb = this.color.slice(0, 3).map((color) => Math.max(0, color))
    const gray = Math.max(0, this.color[3])
    this.fill(context2d, 'source-over', `rgba(${rgb.join(', ')}, ${gray / 255})`, width, height)

    this.$emit('input', this.color)
  }
}
</script>

<style lang="sass" scoped>
.color-editor
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
