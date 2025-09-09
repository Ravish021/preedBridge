import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename);         // Get the current directory name

// Load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // up one level from /config

const dbURL = process.env.MONGODB_URI;

async function connectDB() {
    try {
        if (!dbURL) {
            throw new Error("Database URL is not defined in environment variables.");
        }
        await mongoose.connect(dbURL);
    } catch (err) {
        console.error("Database error: ",err.message);
    }
}

export default connectDB;
