import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB!");
  } catch (err) {
    console.log(err);
  }
};

export default connect;
