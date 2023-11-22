import dotenv from 'dotenv';

dotenv.config({});
import Sequelize from 'sequelize';

export let sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        dialect: process.env.DIALECT,
        host: process.env.HOST,
        port:process.env.PORT_DB,
        charset:process.env.CHARSET,
        collate:process.env.COLLATE,
        operatorsAliases: 'false',
        logging: false,
    }
);
