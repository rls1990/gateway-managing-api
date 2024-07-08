import Device from "../models/device.js";
import Gateway from "../models/gateway.js";

export const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const Device = await Device.findById(id);
    res.json(Device);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const createDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const gate = await Gateway.findById(id);
    if (gate) {
      const newDevice = new Device(req.body);
      const saveDevice = await newDevice.save();
      gate.devices.push(saveDevice);
      await gate.save();
      res.json(saveDevice);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDevice = await Device.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateDevice);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { idGateway, idDevice } = req.params;

    const gateway = await Gateway.findByIdAndUpdate(idGateway, {
      $pull: { devices: idDevice },
    });

    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }

    const device = await Device.findByIdAndDelete(idDevice);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};
