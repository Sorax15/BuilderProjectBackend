import * as mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";

export default class BaseService<T> {
    model: mongoose.Model<any>;

    constructor(modelI: ModelI) {
        this.model = modelI.model;
    }

    post = async (data: T) => {
        const resource = await this.model.create(data);
    }

    get = async (filters = {}): Promise<T[]> => {
        return await this.model.find(filters) as T[];
    }

    getById = async (id: string): Promise<T> => {
        return await this.model.findOne({ _id: new mongoose.Types._ObjectId(id) }) as T;
    }

    delete = async (id: string): Promise<void> => {
       return this.model.remove({ _id: new mongoose.Types._ObjectId(id)});
    }
}
