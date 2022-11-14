import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { 
    updateUser, 
    deleteUser,
    getUser, 
    subscribe,
    unsubscribe,
    like } from '../controller/userConroller.js'
const router = express.Router()

// Update User
router.put("/update/:id", verifyToken, updateUser);

// Delete User
router.put('/delete/:id', verifyToken, deleteUser)

// Get User
router.get('/find/:id', getUser)

// Subscribe
router.put('/subscribe/:id', verifyToken,  subscribe)

// Like a video

router.post('/like/:id', like)

export default router 
