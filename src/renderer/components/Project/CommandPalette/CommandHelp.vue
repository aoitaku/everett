<template lang="pug">
.command-help
  command-usage(:name="name", :signatures="parameterSignatures")
  command-preview(:item="item", :values="values")
  .cog(v-for="(signature, index) in parameterSignatures", :key="index")
    el-select(v-if="signature.type === 'select'", v-model="values[index]", size="small", placeholder="選択してください", no-data-text="データなし")
      el-option(v-for="value in signature.value", :value="value", :key="`${index}:${value}`")
    tone-editor(v-if="signature.type === 'tone'", v-model="values[index]")
    .color(v-if="signature.type === 'color'")
      .preview
        .layer.flash
        img(src="~@/assets/printertest.png")
    .point(v-if="signature.type === 'point'")
      el-input
      el-input
    .scale(v-if="signature.type === 'scale'")
      el-input
      el-input
    .option(v-if="signature.type === 'option'")
      el-switch(v-model="values[index]")
    el-select(v-if="signature.value === 'filename'", v-model="values[index]", size="small", placeholder="選択してください", no-data-text="データなし")
    el-input(v-if="!signature.type", size="small", v-model="values[index]")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import CommandUsage from './CommandUsage.vue'
import CommandPreview from './CommandPreview.vue'
import ToneEditor from './ToneEditor.vue'
import { ICommandDefinition } from '../../../commands/definitions'

@Component({
  components: {
    CommandUsage,
    CommandPreview,
    ToneEditor,
  }
})
export default class CommandHelp extends Vue {
  @Prop({ default: {
    name: '',
    title: '',
    example: '',
    parameterSignatures: [],
  }})
  public item: ICommandDefinition

  public values: { [key: string]: string | number[] | number | boolean } = {}

  public get name () {
    return this.item.name
  }

  public get title () {
    return this.item.title
  }

  public get parameterSignatures () {
    return this.item.parameterSignatures
  }

  public created () {
    this.values = this.item.parameterSignatures.reduce((prev, signature, index) => {
      switch (signature.type) {
      case 'tone':
        return { ...prev, [index]: [0, 0, 0, 0] }
      case 'color':
        return { ...prev, [index]: [255, 255, 255, 170] }
      case 'point':
      case 'size':
        return { ...prev, [index]: [0, 0] }
      case 'select':
        return { ...prev, [index]: signature.value[0] }
      case 'option':
        return { ...prev, [index]: false }
      default:
        return { ...prev, [index]: 0 }
      }
    }, this.values)
  }
}
</script>

<style lang="sass" scoped>
.command-help
  margin: 10px 10px 20px
  .cog
    margin: 8px 0
</style>
