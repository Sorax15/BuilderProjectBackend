import * as mongoose from "mongoose";

export interface UserI {
    name: string;
    email: string;
    type: string;
    password: string;
}

export default interface UserSI extends UserI, mongoose.Document {

}
