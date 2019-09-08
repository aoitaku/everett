import VueRouter from 'vue-router'
import OpenProject from './components/OpenProject.vue'
import Project from './components/Project.vue'

export const router = new VueRouter({
  routes: [
    { path: '/', name: 'open-project', component: OpenProject },
    { path: '/project', name: 'project', component: Project },
  ],
})
