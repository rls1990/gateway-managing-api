import { z } from "zod";

export const gatewaySchema = z.object({
  serial_number: z.string({ required_error: "El Serial Number es requerido" }),
  name: z.string({ required_error: "El nombre es requerido" }),
  ip_address: z
    .string({ required_error: "El Ip Address" })
    .ip({ version: undefined, message: "Invalid IP" }),
  devices: z
    .array()
    .max(10, "El número de dispositivos no puede ser mayor de 10")
    .optional(),
});
