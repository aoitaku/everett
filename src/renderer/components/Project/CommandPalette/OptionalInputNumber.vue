<template lang="pug">
.optional-input-number
  el-input-number(v-model="input", size="small", :disabled="!isActivated", controls-position="right")
    el-switch(v-model="isActivated", slot="prepend")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { store } from '../../../store'

@Component
export default class OptionalInputNumber extends Vue {
  public isActivated: boolean = false
  public input: number | null = null

  @Prop()
  public value: [boolean, number]

  public get files () {
    return store.state.files
  }

  public created () {
    [this.isActivated, this.input] = this.value
  }

  @Watch('input')
  public updateInput () {
    this.$emit('input', [this.isActivated, this.input])
  }
}
</script>

<style lang="sass">
.optional-input-number
  .el-input-number
    width: 214px
    .el-input-group.el-input
      display: inline-table
      .el-input-group__prepend
        padding: 0 10px
</style>
