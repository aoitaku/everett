<template lang="pug">
span.list-value
  span.operator [
  template(v-for="(value, index) in values")
    template(v-if="index > 0") &nbsp;
    value(:value="value[0]") {{ value[0] }}
  span.operator ]
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Value from './Value.vue'

@Component({
  components: { Value },
})
export default class ListValue extends Vue {
  @Prop()
  public values!: ['number', any][]
}
</script>

<style lang="sass" scoped>
.operator
  color: #3f51b5
</style>
