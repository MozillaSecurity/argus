<template>
  <div id="App">
    <AppNavigation
      :auth="auth"
      :authenticated="authenticated"/>
    <router-view
      :auth="auth"
      :authenticated="authenticated"/>
    <AppFooter/>
  </div>
</template>

<script>
import AppNavigation from './AppNavigation'
import AppFooter from './AppFooter'

import AuthService from '../lib/AuthService'

const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'App',
  components: {
    AppNavigation,
    AppFooter
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/Karla-Regular.ttf') format('truetype')
}

html {
  /* for sticky footer */
  position: relative;
  min-height: 100%;
}

body {
  font-family: 'Karla';
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin: 0 0 100px;
  font-size: 13px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: #333;
  text-decoration: none;
}
</style>
