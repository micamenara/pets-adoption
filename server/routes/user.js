'use strict'

const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();
// const md_auth = require('../middlewares/authenticated');

// router.get('/:id', md_auth.ensureAuth, UserController.getUser);
router.get('/', UserController.getAll);
router.post('/', UserController.createUser);

router.get('/:id', UserController.getUser);


module.exports = router;
