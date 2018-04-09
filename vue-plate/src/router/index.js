import Vue from 'vue'
import Router from 'vue-router'
import myplate from '@/components/myplate'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myplate',
      component: myplate
    }
  ]
})
