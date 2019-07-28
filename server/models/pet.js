'use strict'

const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = Schema({
    name: String,
    description: String,
    place: String,
    image: String,
    userId: String,
    status: String,
    userAdoptId: String,
    dateAdopt: String,
    datePublished: String,
    size: String,
    type: String,
    district: String,
}, { timestamps: true });

// 1: Centro, 2: Sur, 3: Norte

module.exports = mongoose.model('Pet', PetSchema);
