import { Router } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CreateEventDTO } from "../../domain/dtos/EventCreateDTO";
import { authenticateToken } from "../middleware/auth";
import { Location } from "../../domain/entities/Location";
import { Event } from "../../domain/entities/Event";
import { DeleteEventDTO } from "../../domain/dtos/EventDeleteDTO";
import { GetByIdEventDTO } from "../../domain/dtos/EventGetByIdDTO";
import { LocationData } from "../../domain/interfaces/IMapService";
import { UpdateEventDTO } from "../../domain/dtos/EventUpdateDTO";
const router = Router()

const eventController = DIContainer.getEventController();

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event management
 */

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event and associated location.
 *     tags:
 *       - Event
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the user creating the event
 *               address:
 *                 type: string
 *                 description: Address of the location where the event will take place
 *               name:
 *                 type: string
 *                 description: Name of the event
 *               date_time:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the event
 *               status:
 *                 type: string
 *                 description: Status of the event
 *               description:
 *                 type: string
 *                 description: Description of the event
 *               capacity:
 *                 type: integer
 *                 description: Capacity of the event
 *             required:
 *               - user
 *               - address
 *               - name
 *               - date_time
 *               - status
 *               - capacity
 *     responses:
 *       '200':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier of the event
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who created the event
 *                 location_id:
 *                   type: integer
 *                   description: ID of the location where the event will take place
 *                 name:
 *                   type: string
 *                   description: Name of the event
 *                 date_time:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of the event
 *                 status:
 *                   type: string
 *                   description: Status of the event
 *                 description:
 *                   type: string
 *                   description: Description of the event
 *                 capacity:
 *                   type: integer
 *                   description: Capacity of the event
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */
router.post("/create", authenticateToken, (req, res, next) => {
    const { user, address, name, date_time, status, description, capacity } = req.body
    eventController.createLocation(address)
    .then((location: Location) => {
        const event = CreateEventDTO.create({
            user_id: user.id,
            location_id: location.id,
            name: name,
            date_time: date_time,
            status: status,
            description: description,
            capacity: capacity
        })
        return eventController.createEvent(event)
    })
    .then((event: Event) => {
        res.status(200).json(event)
    })
    .catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /events/delete/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by its ID.
 *     tags:
 *       - Event
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the deleted event
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete/:id", authenticateToken, (req, res, next) => {
    const data = DeleteEventDTO.create({ id: req.params.id });
    eventController.deleteEvent(data)
    .then((event: Event) => {
        res.status(200).json(event)
    })
    .catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /events/update/{id}:
 *   put:
 *     summary: Update an event
 *     description: Updates an existing event by its ID.
 *     tags:
 *       - Event
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the event
 *               date_time:
 *                 type: string
 *                 format: date-time
 *                 description: Updated date and time of the event
 *               status:
 *                 type: string
 *                 description: Updated status of the event
 *               description:
 *                 type: string
 *                 description: Updated description of the event
 *               capacity:
 *                 type: integer
 *                 description: Updated capacity of the event
 *             required:
 *               - name
 *               - date_time
 *               - status
 *               - capacity
 *     responses:
 *       '204':
 *         description: Event updated successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
router.put("/update/:id", authenticateToken, (req, res, next) => {
    const data = UpdateEventDTO.create({ ...req.body, id: req.params.id });
    eventController.updateEvent(data)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /events/get/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Retrieves details of an event by its ID.
 *     tags:
 *       - Event
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier of the event
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who created the event
 *                 location_id:
 *                   type: integer
 *                   description: ID of the location where the event will take place
 *                 name:
 *                   type: string
 *                   description: Name of the event
 *                 date_time:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of the event
 *                 status:
 *                   type: string
 *                   description: Status of the event
 *                 description:
 *                   type: string
 *                   description: Description of the event
 *                 capacity:
 *                   type: integer
 *                   description: Capacity of the event
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get/:id", authenticateToken, (req, res, next) => {
    const data = GetByIdEventDTO.create({ id: req.params.id });
    eventController.getEventById(data)
    .then((event: Event) => {
        res.status(200).json(event)
    })
    .catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /events/{id}/nearbyLocations:
 *   get:
 *     summary: Get nearby locations for an event
 *     description: Retrieves nearby locations for a specific event by its ID.
 *     tags:
 *       - Event
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event for which to retrieve nearby locations
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Nearby locations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier of the location
 *                   name:
 *                     type: string
 *                     description: Name of the location
 *                   address:
 *                     type: string
 *                     description: Address of the location
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitude of the location
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitude of the location
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:id/nearbyLocations", authenticateToken, (req, res, next) => {
    console.log("a?")
    const data = GetByIdEventDTO.create({ id: req.params.id });
    eventController.getNearbyLocations(data)
    .then((locations: LocationData[]) => {
        res.status(200).json(locations)
    })
    .catch(err => {
        next(err)
    })
})

export { router as eventRoutes };