import { DB_URI } from "./config.js";
import mongoose from "mongoose";
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connection to MongoDB", err);
  });

mongoose.set("debug", true);
