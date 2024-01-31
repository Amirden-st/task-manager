import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id
            },
            'secret',
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.json({...userData, token})
    } catch (e) {
        res.status(500).json({
            message: 'Failed to register user'
        })
        console.log(e)
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({name: req.body.name})

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Wrong name or password'
            })
        }

        const token = jwt.sign({
                _id: user._id
            },
            'secret',
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.json({...userData, token})
    } catch (e) {
        res.status(500).json({
            message: 'Failed to login user'
        })
        console.log(e)
    }
}

export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...'
        })
        console.log(e)
    }
}