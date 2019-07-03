'use strict';

const AdoptionRequest = require('../models/adoptionRequest');
const User = require('../models/user');

const getAdoptionRequest = (req, res) => {
  const petId = req.params.id;

  AdoptionRequest.find({_id: petId, status: 'published'}, (err, pet) => {
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

const getAll = (req, res) => {
  AdoptionRequest.find({status: 'published'}, function(err, pets) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pets) {
      res.send(pets);
    }
  });
};

const createAdoptionRequest = (req, res) => {
  User.findById({_id: req.body.userId}, function(err, user) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (user) {
      const adoptionRequest = new AdoptionRequest({
        userId: req.body.userId,
        description: req.body.description,
        status: 'published',
        fblink: req.body.fblink,
        phone: req.body.phone,
        petId: req.body.petId,
        user: user
      });

      adoptionRequest.save(function(err) {
        res.send({ message: "Adoption Request Created successfully"});
      });
    }
  });
};

const getAllByPetId = (req, res) => {
  const petId = req.params.id;
  AdoptionRequest.find({ petId: petId }, function(err, pets) {
    if (err) {
      return res.status(500).send({ message: "Error in the request", err });
    }
    if (pets) {
      res.send(pets);
    }
  });
}

module.exports = { getAll, getAdoptionRequest, createAdoptionRequest, getAllByPetId };
