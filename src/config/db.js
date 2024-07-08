import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/gategay-managing-db")
    .then(() => console.log(">>> Conected mongodb"))
    .catch((err) => console.log(err));
};
