import type { Message } from "discord.js";
import { dataUsers } from "../events/envents";

export const upCommand = async (message: Message, authorIdCommand: string) => {

    if (!dataUsers[authorIdCommand]) {
        dataUsers[authorIdCommand] = [new Date().getHours().toLocaleString("pt-BR"), new Date().getMinutes().toLocaleString("pt-BR")];
        await message.react("⌛");
    }

};