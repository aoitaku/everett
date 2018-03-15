<template lang="pug">
.command-help
  command-usage(:name="name", :signatures="parameterSignatures")
  command-example(:item="item", :values="values")
  .cog(v-for="(signature, index) in parameterSignatures", :key="index")
    el-select(v-if="signature.type === 'select'", v-model="values[index]", size="small", placeholder="選択してください", no-data-text="データなし")
      el-option(v-for="value in signature.value", :value="value", :key="`${index}:${value}`")
    tone-editor(v-if="signature.type === 'tone'", v-model="values[index]")
    .color(v-if="signature.type === 'color'")
      .preview
        .layer.flash
        img(src="~@/assets/printertest.png")
    .tone(v-if="signature.type === 'tone'")
    .point(v-if="signature.type === 'point'")
    .scale(v-if="signature.type === 'scale'")
    .option(v-if="signature.type === 'option'")
      el-switch(v-model="values[index]")
    el-select(v-if="signature.value === 'filename'", v-model="values[index]", size="small", placeholder="選択してください", no-data-text="データなし")
    el-input(v-if="!signature.type", size="small", v-model="values[index]")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import CommandUsage from './CommandUsage.vue'
import CommandExample from './CommandExample.vue'
import ToneEditor from './ToneEditor.vue'
import { ICommandDefinition } from '../../../commands/definitions'

@Component({
  components: {
    CommandUsage,
    CommandExample,
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

  public values: { [key: string]: string } = {}

  public get name () {
    return this.item.name
  }

  public get title () {
    return this.item.title
  }

  public get parameterSignatures () {
    return this.item.parameterSignatures
  }
}
</script>

<style lang="sass" scoped>
.command-help
  margin: 10px 10px 20px
  .cog
    margin: 8px 0
</style>
