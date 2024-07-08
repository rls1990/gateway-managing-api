import { Schema, model } from "mongoose";

// fields option: type, required, trim, unique
const deviceSchema = new Schema({
  vendor: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["online", "offline"], required: true },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

deviceSchema.set("toJSON", {
  transform: (_doc, objectReturn) => {
    objectReturn.uid = objectReturn._id;
    delete objectReturn._id;
    delete objectReturn.__v;
  },
});

export default model("Device", deviceSchema);
