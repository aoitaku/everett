<template lang="pug">
.editor-header
  el-button.nav-backward(type="text", @click="back") ‹ 戻る
  .project-name {{ content | projectNameFromPath }}
  el-button.test-play(type="text", @click="play", :disabled="disabled") テストプレイ
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import path from 'path'
import * as fs from 'fs'

@Component({
  filters: {
    projectNameFromPath (projectPath: string) {
      if (!projectPath) {
        return ''
      }
      const systemFile = fs.readFileSync(`${path.dirname(projectPath)}/data/system.json`, 'utf-8')
      const systemData = JSON.parse(systemFile)
      if (!systemData) {
        return ''
      }
      return `${systemData.gameTitle} (${path.dirname(projectPath)})`
    },
  },
})
export default class EditorHeader extends Vue {
  @Prop({ default: '' })
  public content: string

  @Prop({ default: false })
  public disabled: boolean

  public back () {
    ipcRenderer.send('cleanTestData')
    this.$router.push({ name: 'open-project' })
  }

  public play () {
    this.$emit('play-clicked')
  }
}
</script>

<style lang="sass" scoped>
.editor-header
  box-sizing: border-box
  width: 100%
  height: 40px
  display: flex
  justify-content: stretch
  border-bottom: 1px solid #aaaaaa
  .el-button
    margin: 0 20px
  .project-name
    color: #333333
    font-size: 14px
    flex-grow: 1
    text-align: left
    margin: 0 20px
    line-height: 40px
</style>
