<template lang="pug">
.command-help
  command-usage(:name="name", :signatures="parameterSignatures")
  command-example(:content="example")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import CommandUsage from './CommandUsage.vue'
import CommandExample from './CommandExample.vue'
import { ICommandDefinition } from '../../../commands/definitions'

@Component({
  components: {
    CommandUsage,
    CommandExample,
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

  public get name () {
    return this.item.name
  }

  public get title () {
    return this.item.title
  }

  public get example () {
    return this.item.example
  }

  public get parameterSignatures () {
    return this.item.parameterSignatures
  }
}
</script>

<style lang="sass" scoped>
.command-help
  margin: 10px 10px 20px
</style>
