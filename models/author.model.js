import dotenv from 'dotenv';
dotenv.config({ path: `../.env` });
import { sequelize } from '../utils/connect.js';
import { DataTypes, Model } from 'sequelize';
import { bcrypt } from '../utils/bcrypt.js'; 
import { enumGender } from '../utils/enums.js';  
import { note ,token } from './index.js';
 class author extends Model {}

author.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'لا يمكنك ترك الاسم فارغ ',
                },
            },
            set(value) {
                this.setDataValue('name', value.trim());
            },
        },
        gender: {
            type: DataTypes.ENUM,
            values: Object.values(enumGender),
            allowNull: false,
        },
       
        phoneNumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: {
                args: true,
                msg: 'رقم الهاتف موجود ل حساب اخر ',
            },
            is: /^(09)(\d{8})$/,
            validate: {
                notEmpty: {
                    msg: 'لا يمكن ترك رقم الهاتف فارغ',
                },
            },
        },
       
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
                msg: 'اسم المستخدم موجود لحساب اخر ',
            },
            validate: {
                notEmpty: {
                    msg: 'لايمكنك ترك اسم المستخدم فارغ ',
                },
                len: {
                    args: [3, 30],
                    msg: 'لا يمكن ن يكون اسم المستخدم اقل من 3 محارف او اكثر من 30 محرف ',
                },
            },
            set(value) {
                this.setDataValue('username', value.trim().toLowerCase());
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'لايمكن ان يكون كلمة السر فارغة ',
                },
            },
        },

        avatar: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
      
    },

    {
        sequelize, // We need to pass the connection instance
        tableName: 'author',
        timestamps: true,
      
        updatedAt: false,
        //! Triggers
        hooks: {
            beforeCreate: (author) => {
                //check if password is content the username
                if (author.password.includes(author.username))
                    throw new Error(
                        `\n Can't password is content  username :( \n  Your password : ${author.password} \n  Your username : ${author.username}`
                    );

                //check if the username  is same tha password
                if (author.userName === author.password)
                    throw new Error("Can't be username is same password ");

                //bcrypt password
                author.password = bcrypt(author.password);
             },
            beforeUpdate: (author) => {
                if (author.password) {
                    //use to check if their are password
                    //bcrypt password
                    author.password = bcrypt(author.password);
                }
            },

            beforeDestroy: async (userInfo) => {
             
                await token .destroy({
                    where: { authorId: userInfo.id },
                    force: true,
                });
               
                await note.destroy({
                    where: { authorId: userInfo.id },
                    raw: true,
                });
            },
        },
    }
);

export default author;
