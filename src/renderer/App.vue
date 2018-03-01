<template lang="pug">
#app
  router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
}
</script>

<style lang="sass">
html, body
  margin: 0
  padding: 0
  height: 100%
#app
  font-family: sans-serif
  height: 100%
</style>
