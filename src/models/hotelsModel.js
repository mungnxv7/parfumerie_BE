import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const hotelsModel = new Schema(
  {
    hotelName: { type: String, required: true },
    hotelType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
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
hotelsModel.plugin(mongoosePaginate);
const Hotels = mongoose.model("Hotels", hotelsModel);

export default Hotels;
