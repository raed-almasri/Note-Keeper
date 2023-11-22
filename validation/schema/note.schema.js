import Joi from 'joi';
export const schema = {
    body: Joi.object({
        text: Joi.string().required().trim().min(1).max(300),
        title: Joi.string().required().trim().min(1).max(50),
       
    }),
    params: Joi.object({ id: Joi.number().required().min(1).max(1e7) }),
    query: Joi.object({ 
        page: Joi.number().required().min(1).max(1e3), 
        size: Joi.number().required().min(1).max(1e4) }),
};
