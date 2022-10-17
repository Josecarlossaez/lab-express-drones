const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js")

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((response)  => {
    console.log(response)
    res.render("drones/list.hbs", {
      listDrones: response
    })
  })
  .catch((error) =>{
    next(error)
  })
})

// Iteration #3: Add a new drone
// GET
router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form.hbs")
})

// Iteration #3: Add a new drone
// POST
router.post('/drones/create', (req, res, next) => {

  const droneToAdd = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  }

  Drone.create(droneToAdd)
  .then((response) =>{
    console.log(response);
    res.redirect("/drones")
  })
  .catch((error) => {
    next(error)
  })
})
  
//GET
// Iteration #4: Update the drone
router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params

  Drone.findById(id)
  .then((response) => {
    res.render("drones/update-form.hbs", {
      details: response
    })

  })
  .catch((error) => {
    next(error)
  })
  })


//POST
// Iteration #4: Update the drone
router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params

  const droneToUpdate = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  }

  Drone.findByIdAndUpdate(id, droneToUpdate)
  .then((response) =>{
    console.log(response)
    res.redirect("/drones")
  })
  .catch((error) =>{
    res.redirect(`/drones/${id}/edit`)
  })
});






router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id)
.then(()=> {
  
res.redirect("/drones")
})
.catch((error) => {
  next(error)
})
});

module.exports = router;
