// scripts/db.ts
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}
