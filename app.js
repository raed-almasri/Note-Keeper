import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import expressSanitizer from 'express-sanitizer';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';

import badInputConfig from './config/badInput.js';
import logRegisterConfig from './config/log.js';
import corsConfig from './config/cors.js';
import router from './routers/router.js';
import createDatabase from './utils/createDatabase.js'; 

const app = express();
dotenv.config({ path: `./.env` });
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' })); 
app.use(expressSanitizer());
app.use(express.json());

badInputConfig(app);
logRegisterConfig(app);
// //corsConfig
corsConfig(app);
// // helps in securing HTTP headers.s
app.use(helmet());
app.use(
    helmet.hsts({
        maxAge: 0,
    })
);

// create database if not exists
createDatabase();
 
//routers
app.use(router);

export default app;
