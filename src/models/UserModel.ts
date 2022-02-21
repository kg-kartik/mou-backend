import {Schema,model,Types} from "mongoose";
import Users from "../types/UserTypes";

const {ObjectId} = Types;

const usersSchema = new Schema<Users>({
    _id:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    }
})

const UsersModel = model<Users>("UsersModel",usersSchema);
export default UsersModel;