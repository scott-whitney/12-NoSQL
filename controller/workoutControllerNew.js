const { Exercise, Workout } = require('./../models');

module.exports = {
  getLastWorkout: async (req, res) => {
    console.log("I'm trying to get the last workout I did")
    try {
      const getAllWorkouts = await Workout.find({}).populate("exercises")
      console.log('----workouts below----')
      console.log(getAllWorkouts)
      console.log('------------------')
      const theLatestWorkout = getAllWorkouts.length - 1
      console.log('--------- hey --------')
      const getSpecificWorkout = await Workout.find({ _id: getAllWorkouts[theLatestWorkout]._id }).populate("exercises")
      console.log(getSpecificWorkout)
      console.log('testing aggregate below me ------')
    //   const Test = await Workout.aggregate([
    //     { "$group": {
    //         "_id": req.params.id,
    //         "totalValue": { 
    //             "$sum": { "$sum": "$exercises.duration.value" } 
    //         }
    //     } }
    // ])
    
    // console.log(Test)

      return res.status(200).json(getAllWorkouts)
    } catch (e) {
      return res.status(418).json(e)
    }
  },
  addExercise: async (req, res) => {
    console.log("-----I'm about to add an Exercise-----")

    const { type, name, duration, weight, reps, sets, distance } = req.body
    try{

      let addExercise = await new Exercise({ type, name, duration, weight, reps, sets, distance, workout: req.params.id }).save();

      try {

        // const specificExercise = await Workout.find({_id: req.params.id})

 
        // const addingExercise = await 
        // const exerciseAdded = await Workout.update({$push: { exercises: req.params.id })


        const newExercise = await Workout.findByIdAndUpdate(req.params.id, {$push: { exercises: addExercise } }, { new: true })


     
        console.log(newExercise)
        return res.status(200).json(newExercise);
      } catch (e) {
        return res.status(418).json(e)
      }
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