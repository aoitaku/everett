import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Button,
  Collapse, CollapseItem,
  Dialog,
  Input,
  Notification,
  Table, TableColumn,
  Tabs, TabPane,
  Option,
  Select,
  Slider,
  Switch,
} from 'element-ui'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css' 
import App from './App.vue'
import { router } from './router'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/clipboard'
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
locale.use(lang)
Vue.component(Button.name, Button)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Switch.name, Switch)
Vue.component(Slider.name, Slider)
Vue.component('icon', Icon)
Vue.prototype.$notify = Notification

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
