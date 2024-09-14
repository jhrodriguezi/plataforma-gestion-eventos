import { Router } from "express";
import { InMemoryUserRepository } from "../../infrastructure/repositories/InMemoryUserRepository";
import { CreateUser } from "../../use-cases/user/CreateUser";
import { UserController } from "../controllers/UserController";
import { User } from "../../domain/entities/User";
import { GetAllUsers } from "../../use-cases/user/GetAllUsers";

const router = Router()

const userRepository = new InMemoryUserRepository();
const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const userController = new UserController(createUser, getAllUsers); 

router.post("/create", (req, res) => {
    const {name, email, password} = req.body
    
    //validaciones
    userController.createUser(User.createInstance(name, email, password))
    .then(user => {
        res.json(user)
    }).catch(err => {
        res.status(500)
    })
})

router.get("/", (req, res) => {
    userController.getAllUsers()
    .then(users => {
        res.json(users)
    }).catch(err => {
        res.status(500);
    })
})

export { router as userRoutes };