<template lang="pug">
span.parameter-signature
  | &ensp;
  template(v-if="signature.type === 'optional'") (
  template(v-if="signature.key")
    span.attribute {{ signature.key }}
    template(v-if="!signature.value || signature.value[0] !== 'true'")
      span.operator :
      | &nbsp;
  select-value(v-if="type(signature.type) === 'select'", :value="signature.value")
  span.value(v-else-if="type(signature.type) === 'or'")
    | {&nbsp;
    template(v-for="({ key, values}, index) in signature.values")
      template(v-if="index > 0")
        | &nbsp;|&ensp;
      template(v-if="key")
        span.attribute {{ key }}
        span.operator :
        | &nbsp;
      list-value(:values="values")
    | &nbsp;}
  list-value(v-else-if="type(signature.type) === 'list'", :values="signature.values")
  span.value(v-else)
    value(:value="signature.value[0]") {{ signature | toValue }}
  template(v-if="signature.type === 'optional'") )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { IParameterSignature } from '../../../commands/definitions'
import ListValue from './ListValue.vue'
import SelectValue from './SelectValue.vue'
import Value from './Value.vue'

@Component({
  components: {
    ListValue,
    SelectValue,
    Value,
  },
  filters: {
    toValue (signature: IParameterSignature) {
      switch (signature.type) {
      case 'optional':
        if (signature.value[0] === 'true') {
          return
        }
        return signature.value[0]
      case 'filename':
        return `"${signature.value[1].name} file"`
      default:
        return signature.value[0]
      }
    }
  },
})
export default class ParameterSignature extends Vue {
  @Prop()
  public signature!: IParameterSignature

  public type (type: string) {
    switch (type) {
    case 'or':
    case 'select':
    case 'optional':
      return type
    case 'color':
    case 'tone':
    case 'vector':
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
