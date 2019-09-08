<template lang="pug">
i(:class="valueType")
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Value extends Vue {
  @Prop()
  public value!: string

  public get valueType () {
    switch (this.value) {
      case 'filename':
      case 'string':
      case 'variable':
      case 'number':
        return this.value
      default:
        return 'keyword'
    }
  }
}
</script>

<style lang="sass" scoped>
.string
  color: #3f51b5
.variable
  color: #3f51b5
.number
  color: #F44336
.keyword
  color: #009688
.filename
  color: #3f51b5
</style>
