const { Schema, model } = require('mongoose');

const WorkoutSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  },
  exercises: [ { type: Schema.Types.ObjectId, ref: 'Exercise' } ]
})

module.exports = model('Workout', WorkoutSchema);