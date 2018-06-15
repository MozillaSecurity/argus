import auth0 from 'auth0-js'
import axios from 'axios'
import Router from 'vue-router'

// import conf from '../../conf'

const router = new Router()

class AuthService {
  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)

    this.auth0 = new auth0.WebAuth({
      domain: '', //conf.get('auth.oidc.domain'),
      clientID: '', //conf.get('auth.oidc.client_id'),
      redirectUri: '', //conf.get('auth.oidc.callback_url'),
      audience: '', //`https://${conf.get('auth.oidc.domain')}/userinfo`,
      responseType: '', //'token id_token',
      scope: 'openid email'
    })
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/')
      } else if (err) {
        router.replace('/')
        console.log(err)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  getUserAccount () {
    return localStorage.getItem('id_token').email
  }

  getUserAccessToken () {
    return localStorage.getItem('access_token')
  }

  logout () {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

const auth = new AuthService()

export default {
  auth
}
