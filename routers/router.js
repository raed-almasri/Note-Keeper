import express from 'express';
const router = express.Router();

import authApi from './auth.router.js';
import noteApi from './note.router.js'; 

router.use('/auth', authApi);
router.use('/note', noteApi);
 

router.use('*', (req, res) => {
    res.status(404).send('Error 404 not found page ');
});
export default router;
