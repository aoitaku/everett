<template lang="pug">
span.optional-value
  | (
  value(:value="value") {{ value }}
  | )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Value from './Value.vue'

@Component({
  components: { Value },
})
export default class OptionalValue extends Vue {
  @Prop()
  public value: string
}
</script>
