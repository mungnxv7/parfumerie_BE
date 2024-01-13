import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelsModel = new Schema(
  {
    hotelName: { type: String, required: true },
    hotelType: { type: String, required: true },
    address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      street_address: { type: String, required: true },
    },
    slug: { type: String },
    hotelImage: { type: String, required: true },
    ranking: { type: Number, required: true },

    descreiptionHotel: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

const Hotels = mongoose.model("Hotels", hotelsModel);

export default Hotels;
