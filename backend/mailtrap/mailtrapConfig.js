import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); 
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const TOKEN = process.env.MAILTRAP_API_TOKEN; // Your Mailtrap API token
const ENDPOINT = process.env.MAILTRAP_API_ENDPOINT; // Your Mailtrap API endpoint
// console.log("TOKEN:", TOKEN);


export const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};
