import { number } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelsModel = new Schema(
  {
    hotelName: { type: String, required: true },
    hotelType: { type: String, required: true },
    address: {
      province: { type: Number, required: true },
      district: { type: Number, required: true },
      ward: { type: Number, required: true },
      street_address: { type: String, required: true },
    },
    slug: { type: String },
    hotelImage: {
      path: { type: String, required: true },
    },
    ranking: { type: Number, required: true },

    descreiptionHotel: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const Hotels = mongoose.model("Hotels", hotelsModel);

export default Hotels;
