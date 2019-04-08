'use strict'

const express = require('express');

const PetController = require('../controllers/pet');

const router = express.Router();

router.get('/', PetController.getAll);
router.post('/', PetController.createPet);

router.get('/:id', PetController.getPet);
router.get('/user/:id', PetController.getUserPets);

module.exports = router;
