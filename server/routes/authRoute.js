import express from 'express'
import {signup, signin} from '../controller/authController.js'
const router = express()

// CREATE A NEW USER
router.post('/signup', signup)
// SIGN IN USER
router.post('/signin', signin)



// GOOGLE AUTH
// router.post('/googleAuth', )

export default router