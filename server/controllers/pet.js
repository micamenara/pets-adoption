'use strict';

const Pet = require("../models/pet");

const getPet = (req, res) => {
  const petId = req.params.id;

  Pet.findById(petId, (err, pet) => {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (!pet) {
      return res.status(404).send({ message: "Pet does not exist" })
    }
    if (pet) {
      return res.status(200).send(pet);
    }
  });
};

const getUserPets = (req, res) => {
  const userId = req.params.id;
  Pet.find({userId: userId}, function(err, pets) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pets) {
      res.send(pets);
    }
  });
};

const getAll = (req, res) => {
  Pet.find({}, function(err, pets) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pets) {
      res.send(pets);
    }
  });
};

const createPet = (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    image: req.body.image,
    tel: req.body.tel
  });

  pet.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Pet Created successfully");
  });
};

module.exports = { getPet, createPet, getAll, getUserPets };
