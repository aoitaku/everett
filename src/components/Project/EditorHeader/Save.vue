<template lang="pug">
el-button.save(type="text", @click="save") 保存
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { promisify } from 'util'
import * as fs from 'fs'
import { remote } from 'electron'
import { store } from '../../../store'

@Component
export default class Save extends Vue {
  public sharedState = store.state

  public async save () {
    if (!this.sharedState.selectedFile) {
      const { filePath } = await remote.dialog.showSaveDialog({
        title: 'Save file',
        defaultPath: '.',
      })
      if (!filePath) {
        return
      }
      this.sharedState.selectedFile = filePath
    }
    await promisify(fs.writeFile)(this.sharedState.selectedFile, this.sharedState.source, 'utf-8')
    this.sharedState.edited = false
    this.$notify({
      title: '保存しました',
      message: `${this.sharedState.selectedFile} を更新しました。`,
      type: 'success',
    })
  }
}
</script>
