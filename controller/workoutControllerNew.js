const { Exercise, Workout } = require('./../models');

module.exports = {
  getLastWorkout: async (req, res) => {
    console.log("I'm trying to get the last workout I did")
    try {
      const getAllWorkouts = await Workout.find({}).populate('exercises');
      console.log('----workouts below----')
      console.log(getAllWorkouts)
      console.log('------------------')
      return res.status(200).json(getAllWorkouts)
    } catch (e) {
      return res.status(418).json(e)
    }
  },
  addExercise: async (req, res) => {
    console.log("-----I'm about to add an Exercise-----")
    console.log(req.params.id)
    console.log(req.body)
    const { type, name, duration, weight, reps, sets, distance } = req.body

      try {
        const newExercise = await new Workout.findByIdAndUpdate(req.params.id, {$push: { exercises: req.body } }, { new: true })
  
        // {$push: {exercises: body}}
        console.log(newExercise)
        return res.status(200).json(req.body);
      } catch (e) {
        return res.status(418).json(e)
      }

  },
  createWorkout: async (req, res) => {
    console.log("-------I'm about to try and make a workout-----")
    console.log(req.body)
    try {
      const newWorkout = await new Workout({}).save();
      return res.status(200).json(newWorkout)
    } catch (e) {
      return res.status(403).json(e)

    }
  }

}