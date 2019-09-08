import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/element'
import './plugins/monaco-everett'
import App from './App.vue'
import { router } from './router'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/code'
import 'vue-awesome/icons/comment'
import 'vue-awesome/icons/calculator'
import 'vue-awesome/icons/desktop'
import 'vue-awesome/icons/image'
import 'vue-awesome/icons/music'
import 'vue-awesome/icons/film'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/puzzle-piece'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('icon', Icon)
Vue.prototype.$notify = Notification

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
