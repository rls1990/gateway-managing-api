import { Router } from "express";
import {
  createGategay,
  deleteGategay,
  getAll,
  updateGategay,
} from "../controllers/gateway.controller.js";
import {
  createDevice,
  deleteDevice,
} from "../controllers/device.controller.js";
import { validateSchema } from "../middleware/validator.js";
import { deviceSchema } from "../validators/device.shema.js";
import { gatewaySchema } from "../validators/gateway.shema.js";

const gatewayRouters = Router();

/** @swagger
 * /gateway/:
 *   get:
 *      summary: Get Gateways
 *      tags: [Gateway]
 *      description: Devuelve la lista de Gateway
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *            description: Consulta realizada con exito
 */
gatewayRouters.get("/gateway", getAll);
/** @swagger
 * /gateway/:
 *   post:
 *     summary: Create a new gateway
 *     tags: [Gateway]
 *     description: Create a new gateway
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Gateway object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serial_number:
 *                 type: string
 *                 description: Serial number of the gateway
 *               name:
 *                 type: string
 *                 description: Name of the gateway
 *               ip_address:
 *                 type: string
 *                 description: IP address of the gateway
 *     responses:
 *       200:
 *         description: Device created
 *       400:
 *         description: Invalid request
 */
gatewayRouters.post("/gateway", validateSchema(gatewaySchema), createGategay);
/**@swagger
 * /gateway/{id}:
 *   put:
 *     summary: Update a gateway
 *     tags: [Gateway]
 *     description: Update a gateway
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gateway to update
 *     requestBody:
 *       description: Gateway object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serial_number:
 *                 type: string
 *                 description: Serial number of the gateway
 *               name:
 *                 type: string
 *                 description: Name of the gateway
 *               ip_address:
 *                 type: string
 *                 description: IP address of the gateway
 *     responses:
 *       200:
 *         description: Device updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device not found
 */
gatewayRouters.put(
  "/gateway/:id",
  validateSchema(gatewaySchema),
  updateGategay
);
/**@swagger
 * /gateway/{id}:
 *   delete:
 *     summary: Delete a gateway
 *     tags: [Gateway]
 *     description: Delete a gateway
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the gateway to delete
 *     responses:
 *       200:
 *         description: Device updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device not found
 */
gatewayRouters.delete("/gateway/:id", deleteGategay);
/**@swagger
 * /gateway/{id}:
 *   post:
 *     summary: Add a new device to a gateway
 *     tags: [Device]
 *     description: Add a new device to a gateway
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gateway
 *     requestBody:
 *       description: Device object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendor:
 *                 type: string
 *                 description: Vendor of the device
 *               status:
 *                 type: string
 *                 enum: [online, offline]
 *                 description: Status of the device
 *               dateCreated:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when the device was created
 *     responses:
 *       200:
 *         description: Device created
 *       400:
 *         description: Invalid request
 */
gatewayRouters.post("/gateway/:id", validateSchema(deviceSchema), createDevice);
/**
 * @swagger
 * /gateway/{idGateway}/{idDevice}:
 *   delete:
 *     summary: Delete a device from a gateway
 *     tags: [Device]
 *     description: Delete a device from a gateway
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: idGateway
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the gateway
 *       - in: path
 *         name: idDevice
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the device to delete
 *     responses:
 *       200:
 *         description: Device deleted
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device or gateway not found
 */
gatewayRouters.delete("/gateway/:idGateway/:idDevice", deleteDevice);
export default gatewayRouters;
