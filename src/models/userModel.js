import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userModel = new Schema(
  {
    nameUser: { type: String, require: true, maxLength: 50 },
    nameUser: { type: String, require: true, maxLength: 50 },
    password: { type: String, require: true, maxLength: 32, minLength: 6 },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userModel);
export default User;
