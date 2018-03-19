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
body
  font-family: sans-serif
#app
  height: 100%
</style>
