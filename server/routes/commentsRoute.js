import express from 'express'
import { addComment, deleteComment, getComments } from '../controller/commentsController.js';
import Comments from "../models/CommentsModel.js";
import Video from '../models/VideoModel.js'
import { verifyToken } from '../verifyToken.js';

const router = express.Router()

router.post('/new', verifyToken, addComment)

router.delete("/delete", verifyToken, deleteComment);

router.get("/view", getComments);

export default router