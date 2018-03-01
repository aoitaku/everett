<template lang="pug">
.command-usage(v-html="processedContent")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component({
  filters: {
    
  },
})
export default class CommandFormura extends Vue {
  @Prop({ default: '' })
  public content: string

  public get processedContent () {
    return this.content.replace(/_([^_]+)_/g, (match, part: string) => {
      return `<i>${part}</i>`
    })
  }
}
</script>

<style lang="sass" scoped>
.command-usage
  text-indent: -0.5em
  padding: 10px calc(0.5em + 10px)
  margin: 0 0 10px 0
  background-color: #eeeeee
  border-radius: 4px
  font-size: 13px
  font-family: 'Menlo', 'consolas', monospace
</style>

<style lang="sass">
.command-usage
  i
    color: #0000ff
</style>
