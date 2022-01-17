import type { Message } from "discord.js";
import { dataUsers } from "../events/events";

export const upCommand = async (message: Message, authorIdCommand: string) => {
    const convertForBraziliansTime = 3;
    if (!dataUsers[authorIdCommand]) {
        dataUsers[authorIdCommand] = [Math.abs(Number(new Date().getHours().toLocaleString("pt-BR")) - convertForBraziliansTime), new Date().getMinutes().toLocaleString("pt-BR")];
        await message.react("⌛");
    }
};