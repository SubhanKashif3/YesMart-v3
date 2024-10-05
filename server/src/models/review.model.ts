import mongoose , {Schema , Document} from "mongoose";


export interface IReview extends Document{
    owner : mongoose.Schema.Types.ObjectId,
    content : string;
    subReviews : mongoose.Schema.Types.ObjectId[]
};

