import { Schema, model, Document } from "mongoose";

export interface IAnalytics extends Document {
    month: number; // Month of the sales data (1-12)
    year: number; // Year of the sales data
    totalSales: number; // Total sales amount for the month
    totalOnlineSales: number; // Total online sales
    totalInStoreSales: number; // Total in-store sales
    totalOrders: number; // Total number of orders (online + in-store)
    onlineOrders: number; // Total online orders
    inStoreOrders: number; // Total in-store orders
    returningCustomers: number; // Count of returning customers
    newCustomers: number; // Count of new customers
    totalFootTraffic: number; // Total in-store foot traffic
    createdAt: Date; // Timestamp for when the record was created
    updatedAt: Date; // Timestamp for when the record was last updated
}
const analyticsSchema = new Schema<IAnalytics>({
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    year: {
        type: Number,
        required: true,
        min: 2000, // Adjust as needed
    },
    totalSales: {
        type: Number,
        required: true,
        min: 0,
    },
    totalOnlineSales: {
        type: Number,
        required: true,
        min: 0,
    },
    totalInStoreSales: {
        type: Number,
        required: true,
        min: 0,
    },
    totalOrders: {
        type: Number,
        required: true,
        min: 0,
    },
    onlineOrders: {
        type: Number,
        required: true,
        min: 0,
    },
    inStoreOrders: {
        type: Number,
        required: true,
        min: 0,
    },
    returningCustomers: {
        type: Number,
        required: true,
        min: 0,
    },
    newCustomers: {
        type: Number,
        required: true,
        min: 0,
    },
    totalFootTraffic: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Analytics = model<IAnalytics>('Analytics', analyticsSchema);

export default Analytics;
