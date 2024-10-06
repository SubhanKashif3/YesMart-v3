import mongoose , {Schema , Document} from "mongoose";
import { IReview } from "./review.model";

export interface ISubReview extends Document{
    owner : mongoose.Schema.Types.ObjectId;
    content : string;
    likes : number;
};


const subReviewSchema = new Schema<ISubReview>({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true,"owner is required"]
    },
    content : {
        type : String,
        required : [true,"Content is required"]
    },

    likes : {
        type : Number,
        default : 0
    }
});


export const SubReview = mongoose.model<ISubReview>("SubReview",subReviewSchema);

