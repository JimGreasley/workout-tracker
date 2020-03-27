const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log('api - get last workout') ;
    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];
    console.log('api - add exercise') ;
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    console.log('api - create workout') ;
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    console.log('api - get workouts in range') ;
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
