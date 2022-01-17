import { Client, Intents } from "discord.js";
import * as dotenv from "dotenv";
import { messageEvent } from "./events/envents";
dotenv.config();

export const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

messageEvent();