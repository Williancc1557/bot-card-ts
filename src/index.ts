import { client } from "./client";
import * as dotenv from "dotenv"; // Used to get data in .env
dotenv.config();

console.log("test");

client.login(process.env.TOKEN);