/** @format */

'use strict'
const router = require('express').Router()

const repo = require('../controllers/repo')
const auth = require('../../lib/auth')

router
  .route('/repo')
  .get(auth.authenticate, repo.list)
  .post(auth.authenticate, repo.add)

router
  .route('/repo/:id')
  .get(auth.authenticate, repo.commits)
  .delete(auth.authenticate, repo.delete)
  .put(auth.authenticate, repo.update)

router.route('/repo/:id/:commit').get(auth.authenticate, repo.commit)

module.exports = router
