import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';


const userRouter = express.Router();

userRouter.get('/seed',expressAsyncHandler(
    async (req,res) => {
        //await User.remove({}); //remove all user
        const createdUsers = await User.insertMany(data.users);
        res.status(200).send({createdUsers});
    
    }
));

export default userRouter;