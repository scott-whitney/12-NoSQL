const router = require('express').Router();
const apiRange = require('./apiRange')
// const { getLastWorkoutCon, createWorkoutCon, addExercise } = require('../../controller/workoutController')
const { getLastWorkout, addExercise, createWorkout } = require('./../../controller/workoutControllerNew')
// /api
router.use('/workouts', apiRange);


  // .post(some controller)


router.route('/workouts/:id')
  .put(addExercise);

router.route('/workouts')
  .get(getLastWorkout)
  .post(createWorkout);



module.exports = router;