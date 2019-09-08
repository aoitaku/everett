// attachment of vue plugins
import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $electron?: any
  }
}
