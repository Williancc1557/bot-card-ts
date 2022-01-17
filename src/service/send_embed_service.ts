import { MessageEmbed } from "discord.js";
import type { EmbedTypesParams } from "../types/types";
import { getUserByIdService } from "./get_user_service";
import type { TextChannel } from "discord.js";

export const sendEmbed = async ({
    message,
    channelId,
    hoursBefore,
    minutesBefore,
    hoursNow,
    minutesNow,
    totalMinutes,
    differenceHours }: EmbedTypesParams) => {
    const channelSendLogs = (message.guild?.channels.cache.get(channelId)) as TextChannel;
    const userResponseDb = await getUserByIdService(message.author.id);
    const firstRow = 0;
    const sliceNumberToConcate = -2;
    const listParmamsToConcate = [hoursBefore, minutesBefore, hoursNow, minutesNow, totalMinutes, differenceHours];
    const listParamsConcated = [];

    for (let i = 0; i < listParmamsToConcate.length; i++) {
        listParamsConcated[i] = ("0" + listParmamsToConcate[i]).slice(sliceNumberToConcate);
    }

    const [
        hoursBeforeConcated,
        minutesBeforeConcated,
        hoursNowConcated,
        minutesNowConcated,
        totalyMinutesConcated,
        differenceHoursConcated,
    ] = listParamsConcated;


    const embed = new MessageEmbed()
        .setColor("#008000")
        .setTitle("cartão batido!")
        .setTimestamp(new Date())
        .addFields({ name: "funcionário: ", value: `<@${message.author.id}>` },
            { name: "Tempo trabalhado:", value: `${differenceHoursConcated}h${totalyMinutesConcated}` },
            { name: "Tempo total exercido por esse funcionário: ", value: `${("0" + userResponseDb.rows[firstRow].hours).slice(sliceNumberToConcate)}h${("0" + userResponseDb.rows[firstRow].minutes).slice(sliceNumberToConcate)}`, inline: false },
            { name: "inicio: ", value: `${hoursBeforeConcated}h${minutesBeforeConcated}`, inline: false },
            { name: "final: ", value: `${hoursNowConcated}h${minutesNowConcated}`, inline: false })
        .setAuthor({ name: message.author.username, iconURL: String(message.guild?.iconURL({ dynamic: true })) })
        .setThumbnail(String(message.author.displayAvatarURL()));

    channelSendLogs.send({ embeds: [embed] });
};
