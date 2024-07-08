import { z } from "zod";

export const deviceSchema = z.object({
  vendor: z.string({ required_error: "El campo Vendor es requerido" }),
  //   status: z.string({ required_error: "El campo Status es requerido" }),
  status: z.enum(["online", "offline"], {
    required_error: "El campo Status es requerido",
  }),
});
