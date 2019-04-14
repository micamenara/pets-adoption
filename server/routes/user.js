'use strict'

const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', UserController.createUser);

router.get('/:id', UserController.getUser);
router.post('/login', UserController.logIn);


module.exports = router;
