import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://benitoka:dientedeleche33@cluster0.ucub3.mongodb.net/graphQL?retryWrites=true&w=majority`;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connection to MongoDB", err);
  });
