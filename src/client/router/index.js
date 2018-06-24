import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import List from '../components/List'
import Add from '../components/Add'
import Commits from '../components/Commits'
import Commit from '../components/Commit'
import Profile from '../components/Profile'
import Callback from '../components/Callback'
import NotFound from '../components/errors/404'

import AuthService from '../lib/AuthService'

Vue.use(VueRouter)

const auth = new AuthService()
const router = new VueRouter({
  saveScrollPosition: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      name: 'List',
      path: '/list',
      component: List,
      secure: true
    },
    {
      name: 'Add',
      path: '/add',
      component: Add,
      secure: true
    },
    {
      name: 'Commits',
      path: '/commits/:id',
      component: Commits,
      secure: true
    },
    {
      name: 'Commit',
      path: '/commits/:id/:commit',
      component: Commit,
      secure: true
    },
    {
      name: 'Profile',
      path: '/profile',
      component: Profile,
      secure: true
    },
    {
      name: 'Callback',
      path: '/callback',
      component: Callback
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  router.options.routes.forEach((route) => {
    if (to.matched[0].path === route.path && route.secure) {
      if (!auth.isAuthenticated()) {
        auth.login()
      }
    }
  })
  next()
})

export default router
