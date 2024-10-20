import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
    userId: Schema.Types.ObjectId; // Reference to the user
    orderItems: Array<{
        productId: Schema.Types.ObjectId; // Reference to the product
        quantity: number;
        price: number; // Price at the time of order
    }>;
    totalPrice: number;
    status: string; // e.g., 'pending', 'shipped', 'delivered'
    createdAt: Date; // Automatically managed by timestamps
    updatedAt: Date; // Automatically managed by timestamps
}

const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User' // Assuming you have a User model
        },
        orderItems: [
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
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'], // Define possible statuses
            default: 'pending'
        }
    },
    { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

export const Order = model<IOrder>("Order", orderSchema);
