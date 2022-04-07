import MouAssignee from "./MouAssignee";

interface User {
    _id:string;
    name:string;
    email:string;
    password:string;
    userType:string;
    mou?:Array<MouAssignee>
}

export default User;