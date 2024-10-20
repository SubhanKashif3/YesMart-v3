import { Schema, model, Document } from "mongoose";

export interface ICart extends Document {
    cartItems: Array<{
        productId: Schema.Types.ObjectId;
        quantity: number;
    }>;
}

const cartSchema = new Schema<ICart>(
    {
        cartItems: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product' // Assuming you have a Product model
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ]
    },
    { timestamps: true }
);

export const Cart = model<ICart>("Cart", cartSchema);
