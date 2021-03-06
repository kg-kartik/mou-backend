import express,{NextFunction, Request,Response} from "express";
import Users from "../models/UserModel";
import jwt from "jsonwebtoken";
import UserTypes from "../types/UserTypes";
import ApiResponse from "../types/ApiResponse";
import bcrypt from "bcrypt";
import ErrorResponse from "../utils/ErrorResponse";

require("dotenv").config();

const secret = process.env.JWT_SECRET;
const secret_password = process.env.SECRET_PASSWORD;

export const signin = async (req:Request,res:Response,next:NextFunction) => {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;

    //Checking if user has registered or not
    const user = await Users.findOne({ email });

    if (!user) {
        return next(new ErrorResponse("User is not registered",400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = jwt.sign(
            {
                _id: user._id,
            },
            secret
        );

        const response:ApiResponse = {
            success:true,
            status:200,
            data:{
                user,
                token
            },
            message:"Successfully fetched user"
        }

        res.status(200).json(response);

    } else {
        next(new ErrorResponse("Sorry, Incorrect Email/Password",400));
    }
}

export const signup = async (req:Request,res:Response,next:NextFunction) => {

    //Checking if the user is already registered
    const user = await Users.findOne({email:req.body.email });

    if (user) {
        next(new Error("User with that email already exists"));
    }


    //If not , then save the student
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    if(req.body.userType === "Admin") {
        if("lol" === req.body.secretPassword) {
            console.log(true);
        }
        else{
            return next(new ErrorResponse("Sorry,Incorrext Password",400));
        }
    }

    const newUser = new Users({
        ...req.body,
        password:hashedPass
    });

    const savedUser = await newUser.save();

    const response:ApiResponse = {
        success:true,
        status:200,
        data:{
            newUser
        },
        message:"Successfully fetched user"
    }

    res.status(200).json(response);
}

export const getUserById = (req:Request,res:Response,next:NextFunction) => {
    
    const {_id} = req.body;

    Users.findById({
        _id
    }).then((user) => {
        const response:ApiResponse = {
            success:true,
            status:200,
            data:user,
            message:"Successfully fetched user"
        }
    
        res.status(200).json(response);

    }).catch(next);
}
