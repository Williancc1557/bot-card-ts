import type { Message } from "discord.js";
import { dataUsers } from "../events/events";
import { downCommandCheckIfUserExistsService, getUserByIdService, sendEmbed } from "../service/service";

export const downCommand = async (message: Message, authorIdCommand: string) => {
    const hourArrayLocation = 0;
    const nullBefore = 0;
    const minuteArrayLocation = 1;
    const maxMinutesForConvert = 60;
    const totalDayHours = 24;
    const totalMinute = 60;
    const convertForBraziliansTime = 3;
    const nullDiferece = 0;
    const numberNullHours = 1;

    const hoursBefore = Number(dataUsers[authorIdCommand][hourArrayLocation]);
    const minutesBefore = Number(dataUsers[authorIdCommand][minuteArrayLocation]);

    const hoursNow = Math.abs(Number(new Date().getHours().toLocaleString("pt-BR")) - convertForBraziliansTime);
    const minutesNow = Number(new Date().getMinutes().toLocaleString("pt-BR"));

    let totalyMinutes;
    if (hoursBefore == hoursNow) totalyMinutes = minutesNow - minutesBefore;
    else if (minutesBefore == nullBefore) totalyMinutes = minutesNow + totalMinute;
    else totalyMinutes = Math.abs(totalMinute - minutesBefore) + (minutesNow);

    let differenceHours = 0;

    differenceHours = hoursNow >= hoursBefore ? (hoursNow - hoursBefore) + differenceHours : Math.abs((hoursBefore - totalDayHours)) + hoursNow; // if before day != after day
    if (differenceHours == numberNullHours) differenceHours = nullDiferece;
    else if (differenceHours != nullDiferece) differenceHours--;
    if (totalyMinutes >= maxMinutesForConvert) {
        differenceHours++;
        totalyMinutes = totalyMinutes - maxMinutesForConvert;
    }
    const getUserDbForCheckIfUserExists = await getUserByIdService(authorIdCommand);

    await downCommandCheckIfUserExistsService({
        getUserDbForCheckIfUserExists: getUserDbForCheckIfUserExists,
        authorIdCommand: authorIdCommand,
        differenceHours: differenceHours,
        totalyMinutes: totalyMinutes,
    });

    await message.react("✅");
    delete dataUsers[authorIdCommand];

    await sendEmbed({
        message: message,
        channelId: "931397763537731586",
        hoursBefore: hoursBefore,
        minutesBefore: minutesBefore,
        hoursNow: hoursNow,
        minutesNow: minutesNow,
        totalyMinutes: totalyMinutes,
        differenceHours: differenceHours,
    });

};
