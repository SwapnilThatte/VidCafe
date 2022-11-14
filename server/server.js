import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cookieParser from "cookie-parser";
import cors from 'cors'

// MODULES
import userRoute from './routes/usersRoute.js'
import authRoute from './routes/authRoute.js'
import commentsRoute from './routes/commentsRoute.js'
import videosRoute from "./routes/videosRoute.js";
import { googleAuth } from './controller/authController.js';

// IMPORTANT
const app = express()
app.use(helmet())
const PORT = process.env.PORT || 5000

app.use(cors())
dotenv.config();
app.use(express.json())
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log(`Connected to MongoDB Database`);
});


// ROUTING
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/video', videosRoute)
app.use('/api/google', googleAuth)

// ERROR HANDELING
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something Went Wrong"

    return res.status(status).json({
        success : false,
        status, 
        message 
    })
})


app.listen(PORT, () => {
    console.log(`Server Started on PORT: ${PORT}`);
})