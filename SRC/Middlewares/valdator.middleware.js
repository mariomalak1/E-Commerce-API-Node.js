import { validationResult } from "express-validator";

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).send({errors: errors.array()});
    }
    next();
}

export default validator;