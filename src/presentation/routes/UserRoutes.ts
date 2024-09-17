import { Router } from "express";
import { MAX_PAGE_SIZE } from "../../config/constants";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CreateUserDTO } from "../../domain/dtos/UserCreateDTO";
import { encrypt } from "../../utils/bcrypt";
import { AppError } from "../../errors/customError";
import { UpdateUserDTO } from "../../domain/dtos/UserUpdateDTO";
import { authenticateToken } from "../middleware/auth";
import { GetByIdUserDTO } from "../../domain/dtos/UserGetByIdDTO";

const router = Router()

const userController = DIContainer.getUserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/create", (req, res, next) => {
    encrypt(req.body.password).then(pass_hash => {
        const user = CreateUserDTO.create({
            name: req.body.name,
            email: req.body.email,
            password: pass_hash
        })
        return userController.createUser(user)
    }).then(user => {
        res.json(user)
    }).catch((err: AppError) => {
        next(err)
    })
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       204:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", authenticateToken, (req, res, next) => {
    if(req.body.user.id !== req.params.id) return;
    const user = UpdateUserDTO.create({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    userController.updateUser(user)
    .then(() => {
        res.sendStatus(204)
    }).catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: abcdef123456
 *       400:
 *         description: Email or password was not sent
 *       500:
 *         description: Internal server error
 */
router.post("/login", (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Email or password was not sent'})
    }
    userController.login(req.body.email, req.body.password)
    .then(tokens => {
        res.status(200).send( { data: tokens})
    })
    .catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", (req, res, next) => {
    const data = GetByIdUserDTO.create(req.body)
    userController.getUserById(data)
    .then(user => {
        res.json(user)
    }).catch(err => {
        next(err)
    })
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: pageSize
 *         in: query
 *         description: Number of users per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 12345
 *                   email:
 *                     type: string
 *                     example: user@example.com
 *       400:
 *         description: Invalid page or pageSize
 *       500:
 *         description: Internal server error
 */
router.get("/", (req, res, next) => {
    // Obtener parámetros de consulta `page` y `pageSize`
    const page = (req.query.page) ? parseInt(req.query.page.toString(), 10) : 1;
    let pageSize = (req.query.pageSize) ? parseInt(req.query.pageSize.toString(), 10) : 10;
    
    // Validar parámetros
    if (page < 1) {
        return res.status(400).send('Invalid page number');
    }
    
    if (pageSize < 1) {
        return res.status(400).send('Invalid pageSize');
    }

    // Aplicar límite máximo al tamaño de la página
    pageSize = Math.min(pageSize, MAX_PAGE_SIZE);

    userController.getAllUsers(page, pageSize)
    .then(users => {
        res.json(users)
    }).catch(err => {
        next(err)
    })
})

export { router as userRoutes };