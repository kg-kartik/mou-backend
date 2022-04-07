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
    status:{
        type:String,
        default:"Pending"
    }
})

const MouAssigneeModel = model<MouAssignee>("MouAssigneeModel",mouAssigneeSchema);
export default MouAssigneeModel;