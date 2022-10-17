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
  





router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
