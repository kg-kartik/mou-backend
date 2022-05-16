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
    
        res.status(200).json(response);
        
    })


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

    console.log(req.user._id);

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