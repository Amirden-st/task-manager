import {body} from "express-validator";
import User from "../models/User.js";

export const registerValidation = [
    body('name')
        .isLength({min: 5})
        .withMessage('Name should have more than 5 characters')
        .custom(async value => {
            const user = await User.findOne({name: value})
            if (user) {
                throw new Error('Name already taken')
            }
        })
        .withMessage('Name should be unique'),
    body('password')
        .isLength({min: 5})
        .withMessage('Password should have more than 5 characters'),
    body('avatarUrl', 'Wrong avatar URL format').optional().isURL(),
]