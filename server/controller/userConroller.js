import { createError } from "../error.js"
import User from "../models/UserModel.js"
import Video from "../models/VideoModel.js"

export const updateUser = async (req, res, next) => {
     if (req.params.id === req.user.id) {
         try {
             const updatedUser = await User.findByIdAndUpdate(req.params.id,
                 { $set: req.body },
                 { new: true }
             );
             res.status(200).json(updatedUser);
         } catch (err) {
             next(err);
         }
     } else {
         return next(createError(403, "You can update only your account!"));
     }
}

export const deleteUser = async (req, res, next) => {
     if (req.params.id === req.user.id) {
         try {
             await User.findByIdAndDelete(req.params.id);
             res.status(200).json("User has been deleted.");
         } catch (err) {
             next(err);
         }
     } else {
         return next(createError(403, "You can delete only your account!"));
     }
}

export const getUser = async (req, res, next) => {
     try {
         const user = await User.findById(req.params.id);
         res.status(200).json(user);
     } catch (err) {
         next(err);
     }
}


export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successful");
    } catch (err) {
        next(err);
    }
};



export const unsubscribe = async (req, res, next) => {
    try {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            res.status(200).json("Unsubscription successful.");
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

// http://localhost:5000/api/users/like/6339d35a626113b69e8147cd
export const like = async (req, res, next) => {
    const id = req.body.userId;
    console.log(`Person who Liked : ${id}`);
    const videoId = req.params.id;
    console.log(`Id of video which is liked : ${videoId}`);
    try {
     const updatedvideo = await Video.findByIdAndUpdate(videoId, {
            $push: { likes: id },
        });
        console.log(updatedvideo);
        res.status(200).json(updatedvideo);
    } catch (err) {
        next(err);
    }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        });
        res.status(200).json("The video has been disliked.");
    } catch (err) {
        next(err);
    }
};