import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY ? "set" : "NOT SET",
  api_secret: process.env.API_SECRET ? "set" : "NOT SET"
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
export default cloudinary;