<template lang="pug">
span.select-value
  | {&nbsp;
  template(v-for="keyword, index in value[1].values")
    template(v-if="index > 0") &ensp;|&nbsp;
    value(:value="keyword.value") {{ keyword.value }}
  | &nbsp;}
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
  public value!: ['keyword', { values: { value: string }[]}]
}
</script>
