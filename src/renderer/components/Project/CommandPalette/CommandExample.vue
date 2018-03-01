<template lang="pug">
.command-example
  p 呼び出し例：
  el-input.code(size="small", :value="content", readonly)
    template(slot="append")
      el-button(@click="insertCommandClicked")
        icon(name="clipboard")
</template>

<script lang="ts">
import Vue from 'vue'
import { remote } from 'electron'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class CommandExample extends Vue {
  @Prop({ default: '' })
  public content: string

  public insertCommandClicked () {
    remote.clipboard.writeText(this.content)
    this.$notify({
      title: 'クリップボードにコピーしました',
      message: 'シナリオエディター上に貼り付けることができます',
      type: 'success'
    })
  }
}
</script>

<style lang="sass" scoped>
.command-example
  p
    font-size: 12px
    line-height: 1.8
    margin: 0 0 0 2px
</style>

<style lang="sass">
.command-example
  .el-input-group__append
    padding: 0 10px
  .el-input__inner
    padding: 0 10px
    font-family: "Menlo", "consolas", monospace
</style>
