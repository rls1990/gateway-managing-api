import Gategay from "../models/gateway.js";
import Device from "../models/device.js";

export const getAll = async (_req, res) => {
  try {
    const resp = await Gategay.find().populate("devices");
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const getgategayById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Gategay.findById(id);
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const createGategay = async (req, res) => {
  console.log(req.params);
  try {
    const newgategay = new Gategay(req.body);
    const savegategay = await newgategay.save();
    res.json(savegategay);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateGategay = async (req, res) => {
  try {
    const { id } = req.params;
    const updategategay = await Gategay.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("devices");
    res.json(updategategay);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const deleteGategay = async (req, res) => {
  try {
    const { id } = req.params;
    const deletegategay = await Gategay.findByIdAndDelete(id);

    const deviceIds = deletegategay.devices;
    await Device.deleteMany({ _id: { $in: deviceIds } });

    res.json(deletegategay);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};
