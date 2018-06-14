'use strict'
const router = require('express').Router()

const repo = require('../controllers/repo')
const auth = require('../../lib/auth')

const { checkJwt } = auth

router
  .route('/repo')
  .get(checkJwt, repo.list)
  .post(checkJwt, repo.add)

router
  .route('/repo/:id')
  .get(checkJwt, repo.commits)
  .delete(checkJwt, repo.delete)
  .put(checkJwt, repo.update)

router
  .route('/repo/:id/:commit')
  .get(checkJwt, repo.commit)

module.exports = router
