import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {BadRequestError, validateRequest} from '@wealthface/common';
import jwt from 'jsonwebtoken';
import UserRapo from '../../repos/user-rapo';

const router = express.Router();

router.post('/api/users/signup', [
body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Password mustbe between 2 to 20 chr')
],
validateRequest, 
async(req:Request, res:Response) => {
    const {email, password} = req.body;
   

    const  ifUserExist = await UserRapo.findByEmail(email);
    
    if(ifUserExist.length !== 0) {
        throw new BadRequestError('Email address already registered');
    }
    
    const saveUser = await UserRapo.insert(email, password);
    
    return res.status(201).send(saveUser);

})


export {router as signupRouter};