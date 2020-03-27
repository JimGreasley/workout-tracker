const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
//require("./routes/author-api-routes.js")(app);
//require("./routes/post-api-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// db.User.create({ name: "Ernest Hemingway" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

app.get("/api/workouts", (req, res) => {
   console.log('get/find /api/workouts');
   db.Workout.find({})
//     .populate("exercises")
     .then(dbWorkout => {
       res.json(dbWorkout);
     })
     .catch(err => {
       res.json(err);
     });
 });

app.post("/api/workouts", ({ body }, res) => {
  console.log('post/create /api/workouts', body);
   db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
     })
     .catch(err => {
       res.json(err);
     });
 });

app.put("/api/workouts/:id", (req, res) => {
  console.log('put/update /api/workouts', req.body);
  db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }}, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.get("/populateduser", (req, res) => {
//   // TODO
//   // =====
//   // Write the query to grab the documents from the User collection,
//   // and populate them with any associated Notes.
//   // TIP: Check the models out to see how the Notes refers to the User
//   db.User.find({})
//   .populate("notes")
//   .then(dbUser => {
//     res.json(dbUser);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
