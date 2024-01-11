import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelsModel = new Schema(
  {
    name: { type: String, required: true },
    type_ID: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      specific_location: { type: String, required: true },
    },
    image: {
      path: { type: String, required: true },
      id_image: { type: String, required: true },
    },
    ranking: { type: Number, required: true },
    utilities: { type: [String], required: true },

    description: { type: String, require: true },
  },
  { versionKey: false }
);

const Hotels = mongoose.model("Hotels", hotelsModel);

export default Hotels;
