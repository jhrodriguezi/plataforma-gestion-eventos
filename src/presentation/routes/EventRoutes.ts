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

router.get("/:id/nearbyLocations", authenticateToken, (req, res, next) => {
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