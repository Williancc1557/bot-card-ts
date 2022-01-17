import { client } from "../client";
import type { Message } from "discord.js";
import { upCommand } from "../commands/up";
import { downCommand } from "../commands/down";
import { bulkDeleteService } from "../service/service";

export const dataUsers: any = {};

export const messageEvent = () => {
    client.on("message", async (message: Message) => {
        if (message.channelId == "931169644025360434") {
            if (message.content == "⏬") {
                if (dataUsers[message.author.id]) {
                    await downCommand(message, message.author.id);
                    return bulkDeleteService(message);
                }
            } else if (message.content == "🆙") return upCommand(message, message.author.id);
            else await message.delete();
        }
    });
};