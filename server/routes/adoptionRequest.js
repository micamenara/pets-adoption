'use strict'

const express = require('express');

const AdoptionRequestController = require('../controllers/adoptionRequest');

const router = express.Router();

router.get('/', AdoptionRequestController.getAll);
router.post('/', AdoptionRequestController.createAdoptionRequest);
router.get('/:id', AdoptionRequestController.getAdoptionRequest);

// Get by pet Id
router.get('/pet/:id', AdoptionRequestController.getAllByPetId);

module.exports = router;
