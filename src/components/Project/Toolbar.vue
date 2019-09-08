<template lang="pug">
.toolbar(:class="position")
  slot
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Toolbar extends Vue {
  @Prop({ default: 'top' })
  public position!: string
}
</script>

<style lang="sass" scoped>
.toolbar
  display: flex
  justify-content: flex-end
  width: 100%
  line-height: 29px
  box-sizing: border-box
  &.top
    border-bottom: 1px solid #cccccc
  &.bottom
    border-top: 1px solid #cccccc
</style>
