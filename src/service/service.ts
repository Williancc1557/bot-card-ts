import type { EmbedTypesParams, UserQueryType } from "../types/types";
import querys from "../data/querys";
import type { TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";

const querysServices = new querys();

export const updateUserFromIdService = async ({ id, hours, minutes }: UserQueryType) => {
    return querysServices.updateUserFromId({
        id: id,
        hours: hours,
        minutes: minutes,
    });
};

export const createUserService = async ({ id, hours, minutes }: UserQueryType) => {
    return querysServices.createUser({
        id: id,
        hours: hours,
        minutes: minutes,
    });
};

export const getUserByIdService = async (userId: string) => querysServices.getUsersById(userId);

export const sendEmbed = async ({
    message,
    channelId,
    hoursBefore,
    minutesBefore,
    hoursNow,
    minutesNow,
    totalyMinutes,
    differenceHours }: EmbedTypesParams) => {
    const channel = (message.guild?.channels.cache.get(channelId)) as TextChannel;
    const userInfo = await getUserByIdService(message.author.id);
    const locateRow = 0;
    const embed = new MessageEmbed()
        .setColor("#008000")
        .setTitle("cartão batido!")
        .setTimestamp(new Date())
        .addFields({ name: "funcionário: ", value: `<@${message.author.id}>` },
            { name: "Tempo trabalhado:", value: `${differenceHours}:${totalyMinutes}` },
            { name: "Tempo total exercido por esse funcionário: ", value: `${userInfo.rows[locateRow].hours}:${userInfo.rows[locateRow].minutes}`, inline: false },
            { name: "inicio: ", value: `${hoursBefore}:${minutesBefore}`, inline: false },
            { name: "final: ", value: `${hoursNow}:${minutesNow}`, inline: false })
        .setAuthor({ name: message.author.username, iconURL: String(message.guild?.iconURL({ dynamic: true })) })
        .setThumbnail(String(message.guild?.iconURL({ dynamic: true })));

    channel.send({ embeds: [embed] },);
};  