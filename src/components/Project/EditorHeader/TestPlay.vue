<template lang="pug">
el-button.test-play(type="text", @click="play", :disabled="!canPlay()") テストプレイ
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import * as fs from 'fs'
import path from 'path'
import { store } from '@/store'

@Component
export default class TestPlay extends Vue {
  public sharedState = store.state

  public eventDataExists () {
    return this.sharedState.eventDataJSON.length > 0
  }

  public canPlay () {
    return !this.sharedState.busy && this.sharedState.selectedProject && this.eventDataExists()
  }

  public play () {
    if (this.sharedState.busy || !this.sharedState.selectedProject || !this.eventDataExists()) {
      return
    }
    const projectDir = path.dirname(this.sharedState.selectedProject)
    const testEventData = path.join(projectDir, 'data/Test_Event.json')
    fs.writeFileSync(testEventData, this.sharedState.eventDataJSON)
    ipcRenderer.send('runTestPlay', projectDir)
  }
}
</script>
