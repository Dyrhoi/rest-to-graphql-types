import axios from "axios";
import 'dotenv/config';

const baseURL = process.env.BASE_URL || "http://localhost/"

export const API = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN || ""}`
    }
})