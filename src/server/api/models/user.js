/** @format */

'use strict'
const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  admin: Boolean
})

module.exports = mongoose.model('User', UserSchema)
