<template lang="pug">
.openProject
  el-button(type="text", @click="selectProject") プロジェクトを開く
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { remote } from 'electron'
import { store } from '../store'

@Component
export default class OpenProject extends Vue {
  public sharedState = store.state

  public async selectProject () {
    const files = remote.dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Select a RPG MV project file',
      defaultPath: '.',
      filters: [
        {name: 'RPG MV Project', extensions: ['rpgproject']}
      ]
    })
    if (!files) {
      return
    }
    this.sharedState.selectedProject = files[0]
    this.$router.push({ name: 'project' })
  }

  public mounted () {
    document.title = document.title.split('-').slice(-1)[0].trim()
  }
}
</script>

<style lang="sass" scoped>
.openProject
  display: flex
  width: 100%
  height: 100%
  jusitfy-content: center
  align-items: center
  .el-button
    width: 320px
    font-size: 24px
    line-height: 240px
    border: 1px dotted #409EFF
    margin: auto
</style>
