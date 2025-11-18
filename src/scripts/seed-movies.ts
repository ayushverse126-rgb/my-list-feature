import mongoose from "mongoose";
import { connectDB } from "./db";
import { MovieSchema } from "../modules/items/entities/movie.entity";
import { GenreEnums } from "../modules/myList/entities/myListSchema.entity";

async function seedMovies() {
  await connectDB();

  const Movie = mongoose.model("Movie", MovieSchema);

  const movies = [
    {
      id: "M1",
      title: "Inception",
      description: "A skilled thief who steals secrets through dreams.",
      genres: [GenreEnums.SciFi, GenreEnums.Action],
      releaseDate: new Date("2010-07-16"),
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    },
    {
      id: "M2",
      title: "Interstellar",
      description: "A journey beyond the stars to save humanity.",
      genres: [GenreEnums.SciFi, GenreEnums.Drama],
      releaseDate: new Date("2014-11-07"),
      director: "Christopher Nolan",
      actors: ["Matthew McConaughey", "Anne Hathaway"],
    },
  ];

  await Movie.insertMany(movies);
  console.log("Movies seeded");
  process.exit(0);
}

seedMovies();
