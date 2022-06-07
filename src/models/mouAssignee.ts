import {Schema,model,Types} from "mongoose";
import MouAssignee from "src/types/MouAssignee";

const {ObjectId} = Types;

const mouAssigneeSchema = new Schema<MouAssignee>({
    mouWith:{
        type:String
    },
    purpose:{
        type:String
    },
    pdf:{
        type:String
    },
    user:{
        type:ObjectId,
        ref:"UsersModel"
    },
    question:{
        type:String
    },
    answer:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"
    }
})

const MouAssigneeModel = model<MouAssignee>("MouAssigneeModel",mouAssigneeSchema);
export default MouAssigneeModel;