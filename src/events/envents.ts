import { client } from "../client";
import type { Message, TextChannel } from "discord.js";
import { upCommand } from "../commands/up";
import { downCommand } from "../commands/down";

export const dataUsers: any = {};

export const messageEvent = () => {
    client.on("message", async (message: Message) => {
        if (message.channelId == "931169644025360434") {
            if (message.content == "⏬") {
                if (dataUsers[message.author.id]) {
                    await downCommand(message, message.author.id);
                    const messages = message.channel.messages.fetch();
                    const userMessage = (await messages).filter((m) => m.id != "931170319497039913" && m.author.id == message.author.id && m.content == "🆙" || m.content == "⏬");
                    const channel = (message.channel) as TextChannel;

                    await channel.bulkDelete(userMessage);
                    return;
                }
            }
            if (message.content == "🆙") return upCommand(message, message.author.id);
            await message.delete();
        }
    });
};


