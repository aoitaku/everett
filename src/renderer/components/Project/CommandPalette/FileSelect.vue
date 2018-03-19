<template lang="pug">
el-select.file-select(v-model="input", size="small")
  el-option(v-for="file in files[media]", :value="file", :key="file")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { store } from '../../../store'

@Component
export default class FileSelect extends Vue {
  public input: string | null = null 

  @Prop()
  public value: string

  @Prop()
  public media: string

  public get files () {
    return store.state.files
  }

  public created () {
    this.input = this.value
  }

  @Watch('input')
  public updateInput () {
    this.$emit('input', `"${this.input}"`)
  }
}
</script>
