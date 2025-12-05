import express from "express";

import dotenv, { config } from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const _dirname = path.resolve();
//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this middlware will parse json bodies => req.body
app.use(ratelimiter);
//our simple custom  middlware
app.use((req, res, next) => {
  console.log(`req method is ${req.method} & req url is ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes); // api/notes repeted with all APIs so we make this standard API
//app.use("/api/notes", productsRoutes); // make rotes seperated in there own fille make server.js more orgonized
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}
const PORT = process.env.PORT;

connectDB().then(() => {
  // best practice connecte to DB then run the server
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
