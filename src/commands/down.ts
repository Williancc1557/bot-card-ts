import type { Message } from "discord.js";
import { dataUsers } from "../events/envents";
import { downCommandCheckIfUserExistsService, getUserByIdService, sendEmbed } from "../service/service";

export const downCommand = async (message: Message, authorIdCommand: string) => {
    const hourArrayLocation = 0;
    const minuteArrayLocation = 1;
    const maxMinutesForConvert = 60;
    const totalDayHours = 24;
    const totalMinute = 60;

    const hoursBefore = Number(dataUsers[authorIdCommand][hourArrayLocation]);
    const minutesBefore = Number(dataUsers[authorIdCommand][minuteArrayLocation]);

    const hoursNow = Number(new Date().getHours().toLocaleString("pt-BR")); // hours now
    const minutesNow = Number(new Date().getMinutes().toLocaleString("pt-BR")); // minutes now

    let totalyMinutes = hoursBefore == hoursNow ? minutesNow - minutesBefore : Math.abs((minutesNow - totalMinute)) + (minutesBefore);

    let differenceHours = 0;

    if (totalyMinutes >= maxMinutesForConvert) {
        differenceHours++;
        totalyMinutes = totalyMinutes - maxMinutesForConvert;
    }

    differenceHours = hoursNow >= hoursBefore ? (hoursNow - hoursBefore) + differenceHours : (hoursBefore - totalDayHours) + hoursNow; // if before day != after day
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
