import mongoose from "mongoose";

const patSchema = mongoose.Schema({
  _id:Number,
  firstName: String,
  lastName: String,
  gender: String,
  age: String,
  dob: Date,
  city: String,
  state: String,
  zip: String,
  status: {
    type: String,
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var patientModel = mongoose.model("patient", patSchema);

export default patientModel;
