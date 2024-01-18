import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomsModel = new Schema(
  {
    hotelName: { type: String, required: true },
    hotelType: { type: String, required: true },
    address: {
      province: {
        code: { type: Number, required: true },
        name: { type: String, required: true },
      },
      district: {
        code: { type: Number, required: true },
        name: { type: String, required: true },
      },
      ward: {
        code: { type: Number, required: true },
        name: { type: String, required: true },
      },
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

const Rooms = mongoose.model("Rooms", roomsModel);

export default Rooms;
