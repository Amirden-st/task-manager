import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '')
            .replace(/(Bearer)|([Tt]oken) /, '')

        if (!token) {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const userID = jwt.verify(token, 'secret')?._id

        if (!userID) {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const user = await User.findById(userID)

        if (!user) {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const {passwordHash, ...userData} = user._doc

        req.user = userData
        next()
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...'
        })
        console.log(e)
    }

}