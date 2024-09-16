import { Router } from "express";
import { MAX_PAGE_SIZE } from "../../config/constants";
import { DIContainer } from "../../infrastructure/DIContainer";

const router = Router()

const userController = DIContainer.getUserController();

router.post("/create", (req, res, next) => {
    //TODO: add validations
    userController.createUser({...req.body, password_hash: req.body.password})
    .then(user => {
        res.json(user)
    }).catch(err => {
        next(err)
    })
})

router.put("/:id", (req, res, next) => {
    //TODO: add validations
    userController.updateUser({...req.body, password_hash: req.body.password, id: req.params.id})
    .then(() => {
        res.sendStatus(204)
    }).catch(err => {
        next(err)
    })
})

router.get("/:id", (req, res, next) => {
    //TODO: add validations
    userController.getUserById(req.params.id)
    .then(user => {
        res.json(user)
    }).catch(err => {
        next(err)
    })
})

router.get("/", (req, res, next) => {
    // Obtener parámetros de consulta `page` y `pageSize`
    console.log(req.query.page, req.query.pageSize)
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