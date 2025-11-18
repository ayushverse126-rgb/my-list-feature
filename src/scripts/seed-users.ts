import mongoose from "mongoose";
import { connectDB } from "./db";
import { GenreEnums } from "../modules/myList/entities/myListSchema.entity";
import { UserSchema } from "../modules/users/entities/user.entity";

async function seedUsers() {
  await connectDB();

  const User = mongoose.model("User", UserSchema);

  const users = [
    {
      id: "U1",
      username: "neo",
      preferences: {
        favoriteGenres: [GenreEnums.Action, GenreEnums.Comedy],
        dislikedGenres: [GenreEnums.Horror],
      },
      watchHistory: [
        { contentId: "M1", watchedOn: new Date("2024-01-01"), rating: 8 },
        { contentId: "TV1", watchedOn: new Date("2024-01-10") },
      ],
    },
    {
      id: "U2",
      username: "tess",
      preferences: {
        favoriteGenres: [GenreEnums.Fantasy, GenreEnums.Drama],
        dislikedGenres: [GenreEnums.Horror],
      },
      watchHistory: [],
    },
  ];

  await User.insertMany(users);
  console.log("Users added");
  process.exit(0);
}

seedUsers();
