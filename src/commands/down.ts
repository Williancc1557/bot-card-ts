import type { Message } from "discord.js";
import { dataUsers } from "../events/envents";
import { createUserService, getUserByIdService, sendEmbed, updateUserFromIdService } from "../service/service";

export const downCommand = async (message: Message, authorIdCommand: string) => {
    const hourArrayLocation = 0;
    const minuteArrayLocation = 1;
    const maxMinutesForConvert = 60;
    const totalyDayHours = 24;
    const totalMinute = 60;

    const hoursBefore = Number(dataUsers[authorIdCommand][hourArrayLocation]); // hours before
    const minutesBefore = Number(dataUsers[authorIdCommand][minuteArrayLocation]); // minutes before

    const hoursNow = Number(new Date().getHours().toLocaleString("pt-BR")); // hours now
    const minutesNow = Number(new Date().getMinutes().toLocaleString("pt-BR")); // minutes now

    let totalyMinutes = hoursBefore == hoursNow ? minutesNow - minutesBefore : (minutesNow - totalMinute) + (minutesBefore); // Minutes working
    let differenceHours = 0; // Hours working

    if (totalyMinutes >= maxMinutesForConvert) { // When totalyMinutes pass 60 minutes, convert to hours
        differenceHours++;
        totalyMinutes = totalyMinutes - maxMinutesForConvert;
    }

    differenceHours = hoursNow >= hoursBefore ? (hoursNow - hoursBefore) + differenceHours : (hoursBefore - totalyDayHours) + hoursNow; // if before day != after day
    const checkIfUserExists = await getUserByIdService(authorIdCommand);
    const noneUsersNumber = 0;
    const locateRows = 0;
    if (checkIfUserExists.rowCount == noneUsersNumber) {
        await createUserService({
            id: authorIdCommand,
            hours: differenceHours + checkIfUserExists.rows[locateRows].hours,
            minutes: totalyMinutes + checkIfUserExists.rows[locateRows].minutes,
        });
    } else {
        await updateUserFromIdService({
            id: authorIdCommand,
            hours: differenceHours + checkIfUserExists.rows[locateRows].hours,
            minutes: totalyMinutes + checkIfUserExists.rows[locateRows].minutes,
        });
    }
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
