import dotenv from 'dotenv';
dotenv.config({ path: `../.env` });
import { sequelize } from '../utils/connect.js';
import { DataTypes, Model } from 'sequelize';
 
class note extends Model {}

note.init(
    {
        title:{
            type: DataTypes.STRING(300), 
            allowNull:true,
            set(value) {
                this.setDataValue('title', value.trim());
            },
        },
        text: {
            type: DataTypes.STRING(300),
     
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "text  can't be empty here ",
                },
            },
            set(value) {
                this.setDataValue('text', value.trim());
            },
        },
       
    },
    {
        freezeTableName: true, //use to save model with the text User , without set 's' at the end of text
        sequelize, // We need to pass the connection instance
        tableName: 'note',
        timestamps: false,

        
    }
);
export default note;
