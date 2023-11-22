import dotenv from 'dotenv';

dotenv.config({ path: `../.env` });
import { StatusCodes } from 'http-status-codes';
import { author,  token as tokenTable, } from '../models/index.js';

import { verifyToken } from '../utils/jwt.js';

export const auth = async (req, res, next) => {
    try {
        
        let rawToken = req.headers.authorization;
        if (!rawToken) throw Error('wrong token..! please try again ');

        if (rawToken.startsWith('Bearer '))
            rawToken = rawToken.replace('Bearer ', '');

        let decoded = verifyToken(rawToken);

        if (!decoded || !decoded.id)
            throw Error('wrong token..! please try again ');
 
          
        let userInfo = await tokenTable.findOne({
            where: { token: rawToken.trim() },
            attributes: ['id'],
            include: {
                model: author, 
                where: { id: decoded.id },
            },
        }); 
        if (!userInfo)
            throw Error(
                'JWT is not valid ,Please set the right token and try again'
            );

        req.author = userInfo.author;
     
        next();
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: err.message,
        });
    }
};
