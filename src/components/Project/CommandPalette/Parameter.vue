<template lang="pug">
span(:class="valueType")
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Parameter extends Vue {
  @Prop()
  public value!: string | number

  public get valueType () {
    if (typeof this.value === 'number' || this.value.match(/^-?[0-9]+$/)) {
      return 'number'
    }
    if (this.value.match(/^".*"$/)) {
      return 'string'
    }
    return 'keyword'
  }
}
</script>

<style lang="sass" scoped>
.string
  color: #3f51b5
.number
  color: #F44336
.keyword
  color: #009688
</style>
