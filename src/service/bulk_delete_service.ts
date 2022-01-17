import type { TextChannel, Message } from "discord.js";

export const bulkDeleteService = async (message: Message) => {
    const messages = message.channel.messages.fetch();
    const userMessage = (await messages).filter((m) => m.id != "931170319497039913" && m.author.id == message.author.id && m.content == "🆙" || m.content == "⏬");
    const channel = (message.channel) as TextChannel;
    channel.bulkDelete(userMessage);
};
