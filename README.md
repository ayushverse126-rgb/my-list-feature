src/
 ├── modules/
 │    ├── users/       → user login, user schema, seeding
 │    ├── items/       → movies + tv shows module
 │    ├── myList/      → add/remove/list APIs
 │
 ├── scripts/          → seeding scripts for users, movies, tv shows
 ├── app.module.ts
 └── main.ts


Backend service for an OTT platform implementing User, Movie, TVShow, and My List modules using NestJS + MongoDB.
This service allows users to add/remove items to their personal list.

🚀 Tech Stack

NestJS (TypeScript)
MongoDB + Mongoose
Redis (optional caching layer)
Jest for integration tests


Database Setup + Seeding (IMPORTANT)

Before running the app or tests, run the seed scripts to populate MongoDB with:

Initial Users

Movies

TV Shows

📌 Run Seed Scripts
npm run seed:users
npm run seed:movies
npm run seed:tvshows


These scripts will insert sample documents into:

users collection
movies collection
tv_show collection

These MUST be executed before running the service or tests, otherwise the MyList module will not find any reference data.