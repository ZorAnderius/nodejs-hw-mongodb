import mongoose from "mongoose";

import { env } from "../utils/env.js";
import { connect } from "../constants/connection.js";

export const initMongoConnection = async () => {
    try {
        const user = env(connect.MONGO.USER);
        const pws = env(connect.MONGO.PASSWORD);
        const url = env(connect.MONGO.URL);
        const db = env(connect.MONGO.DB);
        await mongoose.connect(
          `mongodb+srv://${user}:${pws}@${url}/${db}?retryWrites=true&w=majority`,
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log('Error while setting up mongo connection', error);
        throw error;
    }
};