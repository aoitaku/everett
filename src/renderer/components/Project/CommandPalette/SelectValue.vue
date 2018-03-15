<template lang="pug">
span.select-value
  span(v-for="value, index in values")
    span(v-if="index > 0") &ensp;|&nbsp;
    value(:value="value") {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Value from './Value.vue'

@Component({
  components: { Value },
})
export default class SelectValue extends Vue {
  @Prop()
  public values: string[]
}
</script>
