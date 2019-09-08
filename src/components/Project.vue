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
import { promisify } from 'util'
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

  public get files () {
    return store.state.files
  }

  public async mounted () {
    if (!this.selectedProject) {
      this.$router.push({ name: 'open-project' })
      return
    }
    const projectDir = path.dirname(this.selectedProject)
    const systemDataPath = (path.join(projectDir, 'data', 'System.json'))
    const systemDataFile = await promisify(fs.readFile)(systemDataPath, 'utf-8')
    const systemData = JSON.parse(systemDataFile)
    const title = document.title.split('-').slice(-1)[0].trim()
    if (systemData) {
      document.title = `${systemData.gameTitle} (${projectDir}) - ${title}`
      Vue.set(store.state, 'variables', {
        ...store.state.variables,
        ...systemData.variables.slice(1).reduce((
          prev: { [key:number]: string }, variableName: string, index: number
        ) => {
          return { ...prev, [index + 1]: variableName }
        }, {}),
      })
    } else {
      document.title = `(${projectDir}) - ${title}`
    }
    const mediaList = [
      { folder: 'img/pictures', name: 'picture' },
      { folder: 'img/parallaxes', name: 'parallax' },
      { folder: 'audio/bgm', name: 'bgm' },
      { folder: 'audio/bgs', name: 'bgs' },
      { folder: 'audio/me', name: 'me' },
      { folder: 'audio/se', name: 'se' },
      { folder: 'movies', name: 'movie' },
    ]
    mediaList.forEach((media) => this.prepareFilelist(media))
  }

  public async prepareFilelist (media: { folder: string, name: string }) {
    if (!this.selectedProject) {
      return
    }
    if (this.files[media.name]) {
      return
    }
    let ext: string
    switch (media.name) {
      case 'bgm':
      case 'bgs':
      case 'me':
      case 'se':
        ext = '.ogg'
        break
      case 'movie':
        ext = '.webm'
        break
      default:
        ext = '.png'
    }
    const projectDir = path.dirname(this.selectedProject)
    const dir = (path.join(projectDir, media.folder))
    const files = await promisify(fs.readdir)(dir)
    Vue.set(store.state, 'files', {
      ...store.state.files,
      [media.name]: files.filter((file) => {
        return path.extname(file) === ext
      }).map((file) => {
        return path.basename(file, ext)
      }),
    })
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
