import { model, Model, Schema } from "mongoose";

import ModelI from '../interfaces/model.interface';
import UserSI from '../interfaces/user.interface';

@Injectable()
export default class UserModel implements ModelI {
    schema: Schema<any> = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    model: Model<any> = model<UserSI>('users', this.schema);
}
