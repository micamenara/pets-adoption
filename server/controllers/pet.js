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
  Pet.find({status: 'published'}, function(err, pets) {
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
    description: req.body.description,
    type: req.body.type,
    size: req.body.size,
    status: 'published',
    district: req.body.district,
    image: req.body.image,
    userId: req.body.userId,
  });

  pet.save(function(err) {
    // if (err) {
    //   return next(err);
    // }
    res.send({ message: "Pet Created successfully"});
  });
};

const updatePet = (req, res) => {
  const petId = req.params.id;
  Pet.findOneAndUpdate({_id: petId}, req.body, function (err, pet) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pet) {
      res.send({ message: "Pet Updated successfully"});
    }
  });
};

const adoptPet = (req, res) => {
  const petId = req.params.id;
  const userAdoptId = req.params.userId;
  const body = {
    userAdoptId: userAdoptId,
    status: 'adopted'
  }
  Pet.findOneAndUpdate({ _id: petId }, body, function (err, pet) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pet) {
      res.send({ message: "Pet Updated successfully"});
    }
  });
};

const getAdoptedPets = (req, res) => {
  const userAdoptId = req.params.id;
  Pet.find({userAdoptId: userAdoptId}, function(err, pets) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pets) {
      res.send(pets);
    }
  });
}

module.exports = { getPet, createPet, getAll, getUserPets, updatePet, adoptPet, getAdoptedPets };
