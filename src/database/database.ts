import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const url:string = process.env.MONGO_URL

export const connectToMongoDb = () => {
    mongoose
    .connect(url)
        .then(() => console.log('Connected to database'))
        .catch((e) => console.log(`Connection Error to Database ${e}`))
}
