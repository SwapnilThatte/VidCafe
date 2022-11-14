import express from 'express'
import {
    addView,
    deleteVideo,
    getVideo,
    updateVideo,
    trendingVideos,
    randomVideos,
    subscribedChannels,
    getByTag,
    search,
    
} from "../controller/videoController.js";
import { addVideo } from "../controller/videoController.js";
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// Create a Video
router.post('/new', verifyToken, addVideo)

// Update a Video
router.put('/update/:id', verifyToken, updateVideo)

// Delete a Video
router.delete('/delete/:id', verifyToken, deleteVideo)

// Find a Video
router.get('/find/:id', getVideo)

// Add a view to a video
router.put('/view/:id', addView)

// Trending Videos
router.get('/trending', trendingVideos)

// Random Videos
router.get('/random', randomVideos)

// Subscribed Videos
router.get("/subvideo", subscribedChannels);

// Get by Tag
router.get('/tags', getByTag)

// Search a video
router.get('/search', search)


export default router
