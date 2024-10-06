import mongoose , {Schema , Document, mongo} from "mongoose";



export interface IReview extends Document{
    owner : mongoose.Schema.Types.ObjectId,
    content : string;
    likes : number;
    subReviews : mongoose.Schema.Types.ObjectId[]
};

const reviewSchema = new Schema<IReview>({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },


    content : {
        type : String,
        required : [true,"content is required"]
    },

    likes : {
        type : Number,
        default : 0
    },

    subReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubReview"
        }
    ]
},{
    timestamps : true
})