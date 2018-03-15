<template lang="pug">
span.parameter-signature
  span(v-if="signature.name")
    | &ensp;
    span.attribute {{ signature.name }}
    span.operator :
    | &nbsp;
  select-value(v-if="type(signature.type) === 'select'", :values="signature.value")
  list-value(v-else-if="type(signature.type) === 'list'", :values="signature.value")
  optional-value(v-else-if="type(signature.type) === 'option'", :value="signature.value")
  span.value(v-else)
    value(:value="signature.value") {{ signature | toValue }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { IParameterSignature } from '../../../commands/definitions'
import ListValue from './ListValue.vue'
import SelectValue from './SelectValue.vue'
import OptionalValue from './OptionalValue.vue'
import Value from './Value.vue'

@Component({
  components: {
    ListValue,
    SelectValue,
    OptionalValue,
    Value,
  },
  filters: {
    toValue (signature: IParameterSignature) {
      if (signature.value === 'filename') {
        return `"${signature.type} file"`
      } else {
        return signature.value
      }
    }
  },
})
export default class ParameterSignature extends Vue {
  @Prop()
  public signature: IParameterSignature

  public type (type: string) {
    switch (type) {
    case 'select':
    case 'option':
      return type
    case 'color':
    case 'tone':
    case 'point':
    case 'size':
      return 'list'
    default:
      return 'other'
    }
  }
}
</script>

<style lang="sass", scoped>
.parameter-signature
  .operator
    color: #3f51b5
  .attribute
    color: #2196f3
</style>
