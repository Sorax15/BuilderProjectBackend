import * as mongoose from 'mongoose';
import { CallbackError } from "mongoose";

export const connect = () => {
    return new Promise(function (fulfill, reject) {
        return mongoose.connect('mongodb://localhost:27017/Project',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                poolSize: 10,
                useFindAndModify: true
            }, ((err: CallbackError) =>
                    new DatabaseORM().handlerError(err, reject, fulfill)
            ));
    })
}

export const disconnect = () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toString() === 'development') {
        return mongoose.connection.db.dropDatabase().then(() => {
           return mongoose.disconnect();
        });
    }

    return mongoose.disconnect();
}

class DatabaseORM {

    constructor() {}

    handlerError(error: CallbackError, callbackError: any, callbackSuccessful: any): void {
        if (error) {
            return callbackError(error);
        }

        callbackSuccessful(true);
    }
}

export default mongoose;
