const { Exercise, Workout } = require('../models/index')

module.exports = {
  getLastWorkoutCon: async (req, res) => {
    console.log("i'm trying to get the last workout I did")
    try {
      const lastWorkout = await Exercise.find({})
      console.log(lastWorkout)
      console.log(lastWorkout.length)
      return res.satus(200).json(lastWorkout)
    } catch (e) {
      return res.status(403).json({ e })
    }
  },
  createWorkoutCon: async (req, res) => {
    console.log("I am trying to add a todo")
    
    try {
      const newWorkout = await new Workout({}).save();
      return res.status(200).json(newWorkout)  
    } catch (e) {
      return res.status(403).json(e)
    }
  },
  addExercise: async (req, res) => {
    console.log(req.body)
    const { type, name, duration, weight, reps, sets, distance } = req.body
    try {
      console.log('im in the try')
      console.log('-------')
      const newExercise = await new Exercise({ type, name, duration, weight, reps, sets, distance }).save()
      console.log(newExercise)
      return res.status(200).json(newExercise)
      
    } catch (e) {
      return res.status(403).json(e)
    }
  }


}