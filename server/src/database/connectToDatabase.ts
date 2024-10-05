import mongoose  from 'mongoose'

const connectToMongoDbDatabase = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI as string);
    } catch (error) {
        console.log("Mongo Db connection errror");
        process.exit(1);
   }
};

export default connectToMongoDbDatabase