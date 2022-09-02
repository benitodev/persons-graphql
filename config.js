import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

env.MONGODB_URI =
  "mongodb+srv://benitoka:dientedeleche33@cluster0.ucub3.mongodb.net/graphQL?retryWrites=true&w=majority";
export const DB_URI = process.env.MONGODB_URI;
export const SECRET_KEY = "adwad9239244@@@#~|#€adwadaw";