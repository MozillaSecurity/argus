'use strict'
const router = require('express').Router()

const repo = require('../controllers/repo')

router
  .route('/repo')
  .get(repo.list)
  .post(repo.add)

router
  .route('/repo/:id')
  .get(repo.commits)
  .delete(repo.delete)
  .put(repo.update)

router
  .route('/repo/:id/:commit')
  .get(repo.commit)

module.exports = router
