import {NextFunction,Request,Response} from "express";
import MouAssigneeModel from "../models/mouAssignee";
import ApiResponse from "../types/ApiResponse";
import MouAssignee from "../types/MouAssignee";
import sendgrid from "@sendgrid/mail"
import RequestWithUser from "../types/RequestWithUser";
import UsersModel from "../models/UserModel";
import ErrorResponse from "../utils/ErrorResponse";

export const addMou = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    
    const newMou = new MouAssigneeModel<MouAssignee>({
        ...req.body,
        user:req.user._id
    });
  
    const savedMou = await newMou.save();

    UsersModel.findByIdAndUpdate({
        _id:req.user._id
    },{
        $push:{
            mou:savedMou._id
        }
    },{
        new:true,
        runValidators:true
    }).populate("mou")
    .then((user) => {
        const response:ApiResponse = {
            success:true,
            status:200,
            data:user,
            message:"Request for mou sent successfully"
        }
    
        
            const SENDGRID_API_KEY ="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"
            
            sendgrid.setApiKey(SENDGRID_API_KEY);
            
            const msg = {
                to: "goel.kartik39@gmail.com",
                from: "cryptxmuj@gmail.com",
                // Change to your recipient
                // Change to your verified sender
                subject: "lolll",
                html: "thank you",
                text:"hello"
            }
            
            sendgrid
                .send(msg)
                .then((resp) => {
                    console.log('Email sent\n', resp)
                })
                .catch((error) => {
                    console.error(error)
            })
            
        res.status(200).json(response);
        
    })



}

export const updateStatus = (req:RequestWithUser,res:Response,next:NextFunction) => {
    const {mouId,status} = req.body;

    UsersModel.findById({
        _id:req.user._id
    }).then((user) => {
        if(user.userType === "Admin"){

            console.log(user.userType);

            MouAssigneeModel.findOneAndUpdate({
                _id:mouId
            },{
                $set:{
                    status:status
                }
            },{
                new:true,
                runValidators:true
            }).populate("user")
            .then((mou) => {
                const response:ApiResponse = {
                    success:true,
                    status:200,
                    data:mou,
                    message:"MOU status updated successfully"
                }
            
                res.status(200).json(response);
                       
            }).catch(next);
        }
        else{
            return next(new ErrorResponse("Dont have proper rights",400));
        }
    }).catch(next);
}

export const getAllMous = (req:RequestWithUser,res:Response,next:NextFunction) => {

    console.log(req.user,"user");

    UsersModel.findById({
        _id:req.user._id
    }).then((user) => {
        console.log(user.userType);
        if(user.userType === "Admin") {
            MouAssigneeModel.find({})
            .populate("user",["name"])
            .then((mous) => {
                const response:ApiResponse = {
                    success:true,
                    status:200,
                    data:mous,
                    message:"All Mous fetched successfully"
                }

                res.status(200).json(response);
            }).catch(next);      
        }
        else {
            return next(new ErrorResponse("Dont have proper rights",400));
        }
    })
}

export const getUserMous = (req:RequestWithUser,res:Response,next:NextFunction) => {


    UsersModel.findById({
        _id:req.user._id
    }).populate("mou")
    .then((user) => {
        

        const response:ApiResponse = {
            success:true,
            status:200,
            data:user.mou,
            message:"All Mous fetched successfully"
        }

        res.status(200).json(response);

    }).catch(next);      
}

export const addAnswer = (req:RequestWithUser,res:Response,next:NextFunction) => {
    const {mouId,answer} = req.body;

    UsersModel.findById({
        _id:req.user._id
    }).then((user) => {

            MouAssigneeModel.findOneAndUpdate({
                _id:mouId
            },{
                $set:{
                    answer
                }
            },{
                new:true,
                runValidators:true/*  */
            }).populate("user")
            .then((mou) => {
                const response:ApiResponse = {
                    success:true,
                    status:200,
                    data:mou,
                    message:"MOU status updated successfully"
                }
            
                res.status(200).json(response);
                       
            }).catch(next);
        
    }).catch(next);
}


export const addQuestion = (req:RequestWithUser,res:Response,next:NextFunction) => {
    const {mouId,question} = req.body;

    UsersModel.findById({
        _id:req.user._id
    }).then((user) => {
        if(user.userType === "Admin"){

            MouAssigneeModel.findOneAndUpdate({
                _id:mouId
            },{
                $set:{
                    question
                }
            },{
                new:true,
                runValidators:true
            }).populate("user")
            .then((mou) => {
                const response:ApiResponse = {
                    success:true,
                    status:200,
                    data:mou,
                    message:"MOU status updated successfully"
                }
            
                res.status(200).json(response);
                       
            }).catch(next);
        }
        else{
            return next(new ErrorResponse("Dont have proper rights",400));
        }
    }).catch(next);
}


export const getMouById = (req:Request,res:Response,next:NextFunction) => {
    
    const {_id} = req.body;

    MouAssigneeModel.findById({
        _id
    }).then((mou) => {
        const response:ApiResponse = {
            success:true,
            status:200,
            data:mou,
            message:"Mou fetched user"
        }
    
        res.status(200).json(response);

    }).catch(next);
}
