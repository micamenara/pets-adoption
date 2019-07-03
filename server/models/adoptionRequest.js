'use strict'

const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const AdoptionRequestSchema = Schema({
  userId: String,
  description: String,
  status: String,
  fblink: String,
  phone: String,
  petId: String,
  user: Object,
}, { timestamps: true });


module.exports = mongoose.model('AdoptionRequest', AdoptionRequestSchema);
