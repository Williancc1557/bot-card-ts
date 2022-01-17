import type { DownCommandCheckIfUserExistsParamsType, EmbedTypesParams, UserQueryType } from "../types/types";
import querys from "../data/querys";
import type { Message, TextChannel } from "discord.js";
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
    const channelSendLogs = (message.guild?.channels.cache.get(channelId)) as TextChannel;
    const userResponseDb = await getUserByIdService(message.author.id);
    const firstRow = 0;
    const sliceNumberToConcate = -2;
    const listParmamsToConcate = [hoursBefore, minutesBefore, hoursNow, minutesNow, totalyMinutes, differenceHours];
    const listParamsConcated = [];

    const listLocateOne = 0;
    const listLocateTwo = 1;
    const listLocateThree = 2;
    const listLocateFour = 3;
    const listLocateFive = 4;
    const listLocateSix = 5;

    for (let i = 0; i < listParmamsToConcate.length; i++) {
        listParamsConcated[i] = ("0" + listParmamsToConcate[i]).slice(sliceNumberToConcate);
    }

    const hoursBeforeConcated = listParamsConcated[listLocateOne];
    const minutesBeforeConcated = listParamsConcated[listLocateTwo];
    const hoursNowConcated = listParamsConcated[listLocateThree];
    const minutesNowConcated = listParamsConcated[listLocateFour];
    const totalyMinutesConcated = listParamsConcated[listLocateFive];
    const differenceHoursConcated = listParamsConcated[listLocateSix];

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
        .setThumbnail(String(message.author.avatarURL({ dynamic: true })));

    channelSendLogs.send({ embeds: [embed] });
};

export const downCommandCheckIfUserExistsService = async ({ getUserDbForCheckIfUserExists, authorIdCommand, differenceHours, totalyMinutes }: DownCommandCheckIfUserExistsParamsType) => {
    const notExistsUser = 0;
    const firstRow = 0;
    if (getUserDbForCheckIfUserExists.rowCount === notExistsUser) {
        return createUserService({
            id: authorIdCommand,
            hours: differenceHours,
            minutes: totalyMinutes,
        });
    } else {
        return updateUserFromIdService({
            id: authorIdCommand,
            hours: differenceHours + getUserDbForCheckIfUserExists.rows[firstRow].hours,
            minutes: totalyMinutes + getUserDbForCheckIfUserExists.rows[firstRow].minutes,
        });
    }
};

export const bulkDeleteService = async (message: Message) => {
    const messages = message.channel.messages.fetch();
    const userMessage = (await messages).filter((m) => m.id != "931170319497039913" && m.author.id == message.author.id && m.content == "🆙" || m.content == "⏬");
    const channel = (message.channel) as TextChannel;
    channel.bulkDelete(userMessage);
};
