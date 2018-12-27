/**
 * eslint-disable no-undef
 * @format
 */

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'

import router from '../router'
import { AUTH_CONFIG } from '../conf/auth0'

export default class AuthService {
  constructor() {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.authNotifier = new EventEmitter()
    this.authenticated = this.isAuthenticated()
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientID,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: AUTH_CONFIG.audience,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  login() {
    // noinspection JSCheckFunctionSignatures
    this.auth0.authorize()
    // Go to the main page in our app, otherwise we will see the 404 page briefly before the auth0 redirect.
    router.replace('/')
  }

  handleAuthentication() {
    // noinspection JSCheckFunctionSignatures
    this.auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/')
      } else if (error) {
        router.replace('/')
        console.log(error)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log(error)
      } else {
        localStorage.setItem('profile', JSON.stringify(profile))
      }
    })
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')

    this.authNotifier.emit('authChange', false)

    router.replace('/')
  }

  isAuthenticated() {
    // Check whether the current time is past the Access Token's expiry time.
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getUserAccount() {
    return localStorage.getItem('profile')
  }

  getUserAccessToken() {
    return localStorage.getItem('access_token')
  }
}
