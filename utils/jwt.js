import dotenv from 'dotenv';
dotenv.config({ path: `./.env` });
import Jwt from 'jsonwebtoken';
import moment from 'moment';

export let verifyToken = (token) => Jwt.verify(token, process.env.SECRET_KEY);

export let createToken = (req, payload) =>
    Jwt.sign(
        {
            ...payload,
            ipAddress: req.ip,
            startTime: new Date(),
            expiresAt: moment().add(90, 'days').calendar(),
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    