<template lang="pug">
.tone-editor
  .input
    slider(v-model="tone[0]",  :min="-255", :max="255", show-input)
    slider(v-model="tone[1]", :min="-255", :max="255", show-input)
    slider(v-model="tone[2]", :min="-255", :max="255", show-input)
    slider(v-model="tone[3]", :min="0", :max="255", show-input)
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
export default class ToneEditor extends Vue {
  @Prop()
  public value!: [number, number, number, number]

  public tone: [number, number, number, number] = [0, 0, 0, 0]

  public get canvas () {
    return this.$refs.canvas as HTMLCanvasElement
  }

  public get image () {
    return this.$refs.image as HTMLImageElement
  }

  public created () {
    this.tone = [...this.value] as [number, number, number, number]
  }

  public fill (
    context: CanvasRenderingContext2D,
    blend: string,
    color: string,
    width: number,
    height: number,
  ) {
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
    this.fill(
      context2d,
      'saturation',
      `rgba(255, 255, 255, ${gray / 255})`,
      width,
      height,
    )

    const rgb1 = this.tone.slice(0, 3).map((tone) => Math.max(0, tone))
    this.fill(context2d, 'lighter', `rgb(${rgb1.join(', ')})`, width, height)

    this.fill(context2d, 'difference', 'white', width, height)
    const rgb2 = this.tone.slice(0, 3).map((tone) => Math.max(0, -tone))
    this.fill(context2d, 'lighter', `rgb(${rgb2.join(', ')})`, width, height)
    this.fill(context2d, 'difference', 'white', width, height)

    this.$emit('input', this.tone)
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
