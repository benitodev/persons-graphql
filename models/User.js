import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  friends: [{ ref: "Person", type: mongoose.Schema.Types.ObjectId }],
});

const User = mongoose.model("User", userSchema);

export default User;
