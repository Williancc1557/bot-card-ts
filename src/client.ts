import { Client } from "discord.js";
import * as dotenv from "dotenv";
import { messageEvent } from "./events/events";
dotenv.config();

export const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

messageEvent();