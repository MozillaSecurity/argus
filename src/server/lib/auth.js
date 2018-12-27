/** @format */

'use strict'
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const conf = require('../conf')

// Authentication middleware.
// When used, the Access Token must exist and be verified against the Auth0 JSON Web Key Set.
const authenticate = jwt({
  // Dynamically provide a signing key based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${conf.get('auth.oidc.domain')}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: conf.get('auth.oidc.audience'),
  issuer: `https://${conf.get('auth.oidc.domain')}/`,
  algorithms: ['RS256']
})

module.exports = {
  authenticate
}
