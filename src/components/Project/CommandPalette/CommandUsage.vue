<template lang="pug">
.command-usage
  span.symbol @
  span.command {{ name }}
  parameter-signature(
    v-for="(signature, index) in signatures",
    :key="index",
    :signature="signature",
  )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { IParameterSignature } from '@/commands/definitions'
import ParameterSignature from './ParameterSignature.vue'

@Component({
  components: {
    ParameterSignature,
  },
})
export default class CommandUsage extends Vue {
  @Prop()
  public name!: string

  @Prop()
  public signatures!: IParameterSignature[]
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
  .symbol
    color: #F44336
  .command
    color: #2196f3
</style>
