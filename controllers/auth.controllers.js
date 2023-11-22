import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import useragent from 'useragent';

//UTILS
import { compare } from '../utils/bcrypt.js';
import { createToken } from '../utils/jwt.js'; 
 
// MODELS
import {
    author as author, 
    token as tokenTable,
} from '../models/index.js';

 

let setToken = async (req, id) => {
    let agent = useragent.parse(req.headers['user-agent']);
    const token = createToken(req, { id });
    await tokenTable.create({
        token,
        browser: agent.family,
        tokenDevice: req.body.tokenDevice.trim(),
        system: agent.os.toString(),
        device: agent.device.toString(),
        authorId: id,
        expiresAt: moment().add(90, 'days').format('YYYY-MM-DD h:mm:ss'),
    });

    // res.cookie("hnndes-token", token, {
    //   //90 day
    //   //day * hour * minute * second * mile second
    //   maxAge: 90 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    // res.cookie("hnndes-checkToken", true, {
    //   //day * hour * minute * second * mile second
    //   maxAge: 90 * 24 * 60 * 60 * 1000,
    // });
    return token;
};
export default {
    /*
     * @auth
     * @private
     * @method POST
     * @work sign up user
     */
    signup: async (req, res) => {
        try {
            let user = await author.findOne({
                attributes: ['id'],
                where: {
                    [Op.or]: [
                        { username: req.body.username.trim() },
                        { phoneNumber: req.body.phoneNumber.trim() },
                    ],
                },
            });
            if (user) throw Error('بعض الحول المدخلة موجودة سابقا');

            //create user
            var newUser = await author.create({ 
                ...req.body, 
                user_settings: process.env.USER_SETTINGS,
            }); 

             let token = await setToken(req, newUser.id);

             //done created
            res.status(StatusCodes.CREATED).send({
                success: true,
                data: {
                    token,
                 },
            });
        } catch (error) {
               res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
   
    /*
     * @auth
     * @private
     * @method POST
     * @work login
     */
    login: async (req, res) => {
        try {
            const myInfo = await author.findOne({
                where: { username: req.body.username.trim() },
                attributes: [  'id', 'password'],
                
                paranoid: false,
            });

            //if not found user like this username
            if (!myInfo) throw Error('اسم المستخدم غير صحيح');

            //compare password
            const validPassword = await compare(
                req.body.password,
                myInfo.password
            );
            if (!validPassword) throw Error('كلمة المرور غير صحيحة ');

         
            let token = await setToken(req, myInfo.id);

            res.status(StatusCodes.OK).send({
                success: true,
                data: {
                    token, 
                },
            });
        } catch (error) {
            //throw error to user
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
    /*
     * @auth
     * @private
     * @method GET
     * @work logout
     */
    logout: async (req, res) => {
        try {
            //delete token access
            let agent = useragent.parse(req.headers['user-agent']);

            let token = await tokenTable.findOne({
                attributes: ['id'],
                where: {
                    browser: agent.family,
                    device: agent.device.toString(),
                    userId: req.author.id,
                },
            });

            if (!token) throw Error('هذا الحساب مسجل خروج من هذا المتصفح ');

            token.destroy({ force: true });

            // res.clearCookie('hnndes-token');
            // res.cookie('hnndes-checkToken', false, {});
            res.status(StatusCodes.OK).send({
                success: true,
                msg: 'تم تسجيل الخروج بنجاح ',
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
};
