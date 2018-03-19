<template lang="pug">
el-select.variable-select(v-model="input", size="small")
  el-option(v-for="index in keys", :value="index", :label="`${index}: ${variables[index]}`", :key="index")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { store } from '../../../store'

@Component
export default class VariableSelect extends Vue {
  public input: string | null = null 

  @Prop()
  public value: string

  public get variables () {
    return store.state.variables
  }

  public get keys () {
    return Object.keys(this.variables)
  }

  public created () {
    this.input = String(this.value)
  }

  @Watch('input')
  public updateInput () {
    this.$emit('input', this.input)
  }
}
</script>
