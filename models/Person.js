import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  phone: {
    type: String,
    minlength: 5,
  },
  street: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
});

personSchema.plugin(mongooseUniqueValidator);
const Person = mongoose.model("Person", personSchema);

export default Person;
