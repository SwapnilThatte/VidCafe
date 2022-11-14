import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js"
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const {name, password, email} = req.body
    if ((name !== undefined || name !== null) && (password !== undefined || password !== null) && (email != undefined || email != null)) {

    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password : hash})
        await newUser.save()
            .catch(err => {
                return res.status(500).json({
                    status : "500 (INTERNAL SERVER ERROR)",
                    message : err
                })
            })
        res.status(200).json({
            status : "200",
            msg : "User Saved Successfully"
        })
    }
    catch (err) {
        next(err)
    }
}
else {
    return res.status(400).json({
        staus : "400",
        message : "BAD REQUEST USER CREDENTIALS NOT OBTAINED"
    })
}
}



export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (!user) {
            return next(createError(404, "User Not Found"))
        }
        else {
            const isCorrect = await bcrypt.compare(req.body.password, user.password)
            if (!isCorrect) {
                return next(createError(400, "Wrong User Credentials"))
            } 
        }
        const token = jwt.sign({id : user._id}, process.env.JWT)
        res.cookie("access_token", token, {
            httpOnly:true,
        })
        res.status(200).json(user);
    }
    catch(err) {
        next(err)
    }
}


export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (user) {
             const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.status(200).cookie("access-token", token,{
                httpOnly : true
            }).json(user._doc)
        }
        else {
            const newUser = new newUser({
                ...req.body,
                fromGoogle : true
            })
            const savedUser = await newUser.save()
             const token = jwt.sign({ id: savedUser._id }, process.env.JWT); 
            res.status(200)
                 .cookie("access-token", token, {
                     httpOnly: true,
                 })
                 .json(savedUser._doc);
        }
    }
    catch (Err) {
        next(Err)
    }
}