import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.error(e);
  }
}

export default connectDB;