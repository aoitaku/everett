import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css' 
import App from './App.vue'
import { router } from './router'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/code'
import 'vue-awesome/icons/commenting-o'
import 'vue-awesome/icons/calculator'
import 'vue-awesome/icons/desktop'
import 'vue-awesome/icons/image'
import 'vue-awesome/icons/music'
import 'vue-awesome/icons/film'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/puzzle-piece'
import 'codemirror/lib/codemirror.css'
import './everett-mode'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Element, { locale })
Vue.component('icon', Icon)
Vue.prototype.$notify = Notification

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
