 
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
 import {note} from "../models/index.js"
 
export default {

    /*
     * @auth controllers
     * private
     * @method POST
     * @work create note 
     */
    //create
    create: async (req, res) => {
        try {
             await note.create({ ...req.body ,authorId:req.author.id});
            return res
                .status(StatusCodes.CREATED)
                .send({ success: true, msg: 'تمت عملية الانشاء بنجاح' });
        } catch (err) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({ success: false, error: err.message });
        }
    },
    /*
     * @auth controllers
     * private
     * @method PUT
     * @work update note 
     */
    //update
    update: async (req, res) => {
        try {
             let noteInfo = await note.findByPk(req.params.id, {
                attributes: ['id'],
            });
            if (!noteInfo) throw Error(`رقم الملاحظة غير صحيح `);
             
            //create note in db
            await note.update(
                { ...req.body },
                { where: { id: req.params.id } }
            );
            res.status(StatusCodes.OK).send({
                success: true,
                msg: `تمت عملية التحديث بنجاح `,
            });
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: err.message,
            });
        }
    },
    /*
     * @auth controllers
     * private
     * @method POST
     * @work delete note 
     */
    //remove
    remove: async (req, res) => {
         try {
            const noteInfo = await note.findByPk(req.params.id, {
                attributes: ['id'],
            });
            if (!noteInfo) throw Error('رقم الملاحظة غير صحيح ');
            await noteInfo.destroy({ force: true });
            res.status(StatusCodes.OK).send({
                success: true,
                msg: 'تمت عملية الحذف بنجاح',
            });
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: err.message,
            });
        }
    },
    /*
     * @auth controllers
     * private
     * @method GET
     * @work get all notes for this author 
     */
    //get all note
    getAll: async (req, res) => {
        try {
        let {page,size}=req.query;
 

            let allNote = await note.findAll({
                raw: true,
                limit:+size,
                offset:(+page-1)* ( +size),
                attributes: { exclude: ['createdAt',"authorId"] },
                where:{authorId:req.author.id}
            }); 
            res.status(StatusCodes.OK).send({
                success: true,
                data: allNote,
            });
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: err.message,
            });
        }
    },
    getNotById:async (req, res) => {
        try {
         
            let allNote = await note.findAll({
                raw: true, 
                attributes: { exclude: ['createdAt',"authorId"] },
                where:{authorId:req.author.id,id:req.params.id}
            }); 
            res.status(StatusCodes.OK).send({
                success: true,
                data: allNote,
            });
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: err.message,
            });
        }
    },
};
