<template lang="pug">
.project
  editor-header
  .middle
    command-palette
    editor
    editor-result
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import path from 'path'
import * as fs from 'fs'
import { store } from '../store'
import CommandPalette from './Project/CommandPalette.vue'
import EditorHeader from './Project/EditorHeader.vue'
import Editor from './Project/Editor.vue'
import EditorResult from './Project/EditorResult.vue'

@Component({
  components: {
    CommandPalette,
    EditorHeader,
    Editor,
    EditorResult,
  },
})
export default class Project extends Vue {
  public sharedState = store.state

  public get selectedProject () {
    return this.sharedState.selectedProject
  }

  public mounted () {
    if (!this.selectedProject) {
      this.$router.push({ name: 'open-project' })
      return
    }
    const title = document.title.split('-').slice(-1)[0].trim()
    document.title = `${this.projectNameFromPath(this.selectedProject)} - ${title}`
  }

  private projectNameFromPath (projectPath: string) {
    if (!projectPath) {
      return ''
    }
    const systemFile = fs.readFileSync(`${path.dirname(projectPath)}/data/system.json`, 'utf-8')
    const systemData = JSON.parse(systemFile)
    if (!systemData) {
      return ''
    }
    return `${systemData.gameTitle} (${path.dirname(projectPath)})`
  }
}
</script>

<style lang="sass" scoped>
.project
  height: 100%
  .middle
    height: calc(100% - 40px)
    display: flex
</style>
