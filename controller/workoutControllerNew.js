const { Exercise, Workout } = require("./../models");

module.exports = {
  getLastWorkout: async (req, res) => {
    console.log("I'm trying to get the last workout I did");
    try {
      const getAllWorkouts = await Workout.find({}).populate("exercises");
      // const theLatestWorkout = getAllWorkouts.length - 1;
      // const getSpecificWorkout = await Workout.find({
      //   _id: getAllWorkouts[theLatestWorkout]._id,
      // }).populate("exercises");
      // console.log('----------------')
      // console.log(getSpecificWorkout.exercises[0].toString())
      // console.log('-----------------')

      // console.log(getAllWorkouts)
      console.log(getAllWorkouts[4].exercises[1].duration)
      return res.status(200).json(getAllWorkouts);
    } catch (e) {
      return res.status(418).json(e);
    }
  },
  addExercise: async (req, res) => {
    const { type, name, duration, weight, reps, sets, distance } = req.body;
    try {
      let addExercise = await new Exercise({
        type,
        name,
        duration,
        weight,
        reps,
        sets,
        distance,
        workout: req.params.id,
      }).save();
      try {
        const newExercise = await Workout.findByIdAndUpdate(
          req.params.id,
          { $push: { exercises: addExercise } },
          { new: true }
        );
        const addingDuration = await Workout.findByIdAndUpdate(req.params.id, { $inc: { totalDuration: addExercise.duration}})
        console.log(addingDuration)

        return res.status(200).json(newExercise);
      } catch (e) {
        return res.status(418).json(e);
      }
    } catch (e) {
      return res.status(418).json(e);
    }
  },
  createWorkout: async (req, res) => {
    try {
      const newWorkout = await new Workout({}).save();
      return res.status(200).json(newWorkout);
    } catch (e) {
      return res.status(403).json(e);
    }
  },
};
