import User from "./UserTypes";

interface MouAssignee {
    mouWith:string;
    purpose:string;
    pdf:string;
    user:User;
    status:string;
    question:string;
    answer:string;
}

export default MouAssignee;