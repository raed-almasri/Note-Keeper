import express from 'express';
const router = express.Router();
import control from '../controllers/note.controller.js';
import { schema } from '../validation/schema/note.schema.js';
import {
    auth, 
    type,
    validate,
} from '../config/header_routers.js'; 
//create
router.post(
    '/create',
    auth, 
    validate(schema.body, type.body),
    control.create
);

//update
router.put(
    '/update/:id',
    auth, 
    validate(schema.params, type.params), //validate params
    validate(schema.body, type.body), //validate body  
    control.update
);

//remove
router.delete(
    '/delete/:id',
    auth, 
    validate(schema.params, type.params), //validate params
    control.remove
);

//get all
router.get(
    '/all',
     auth,
    control.getAll
);//get all
router.get(
    '/getById/:id',
     auth,
    control.getNotById
);

export default router;
