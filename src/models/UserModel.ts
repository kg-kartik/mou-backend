import {Schema,model,Types} from "mongoose";
import Users from "../types/UserTypes";

const {ObjectId} = Types;

const usersSchema = new Schema<Users>({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    userType:{
        type:String,
    },
    mou:[{
        type:ObjectId,
        ref:"MouAssigneeModel"
    }]
})

const UsersModel = model<Users>("UsersModel",usersSchema);
export default UsersModel;