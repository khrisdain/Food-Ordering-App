import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Username:Password@cluster0.mjud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB Connected"))
}