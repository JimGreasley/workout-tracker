const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
        type: Date,
        default: Date.now
        },
  exercises: [
    {
      name:
          {
            type: String,
            trim: true,
            required: "Name is required"
          },
      type:
          {
            type: String,
            trim: true,
            required: "Type is required"
          },
      weight:
          { type: Number },
      sets:
          { type: Number },
      reps:
          { type: Number },
      duration:
          {
            type: Number,
            required: "Duration is required"
          },
      distance:
          { type: Number }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
