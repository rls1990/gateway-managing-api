import mongoose from "mongoose";
import Device from "./device.js";
import { Schema, model } from "mongoose";

// fields option: type, required, trim, unique
const gatewaySchema = new Schema(
  {
    serial_number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    ip_address: {
      type: String,
      require: true,
    },
    devices: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Device",
      },
    ],
  },
  {
    timestamps: true,
  }
);

gatewaySchema.path("devices").validate(function (devices) {
  return devices.length <= 10;
}, "El número de dispositivos no puede ser mayor de 10");

gatewaySchema.set("toJSON", {
  transform: (_doc, objectReturn) => {
    objectReturn.id = objectReturn._id;
    delete objectReturn._id;
    delete objectReturn.__v;
  },
});

export default model("Gateway", gatewaySchema);
