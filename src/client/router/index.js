import Vue from 'vue'
import VueRouter from 'vue-router'

import auth from '../lib/auth'

import NotFound from '../components/errors/404'
import Dashboard from '../components/Dashboard'
import List from '../components/List'
import Add from '../components/Add'
import Commits from '../components/Commits'
import Commit from '../components/Commit'

Vue.use(VueRouter)

const router = new VueRouter({
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          name: 'List',
          path: 'list',
          component: List
        },
        {
          name: 'Add',
          path: 'add',
          component: Add
        },
        {
          name: 'Commits',
          path: '/commits/:id',
          component: Commits
        },
        {
          name: 'Commit',
          path: '/commits/:id/:commit',
          component: Commit
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!auth.isAuthenticated()) {
    auth.login()
  }
  next()
})

export default router
