import mongoose from "mongoose";

async function connect(url_db) {
  try {
    await mongoose.connect(url_db);
    console.log("Connected database");
  } catch (err) {
    console.log(err);
  }
}

export default connect;
