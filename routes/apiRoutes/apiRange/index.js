const router = require('express').Router();
const { getLastWorkout} = require('../../../controller/workoutControllerNew')


router.get('/range', getLastWorkout);

// /api/workouts
module.exports = router;