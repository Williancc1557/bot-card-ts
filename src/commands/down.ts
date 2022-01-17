import type { Message } from "discord.js";
import { dataUsers } from "../events/events";
import { downCommandCheckIfUserExistsService } from "../service/check_user_exists_service";
import { getUserByIdService } from "../service/get_user_service";
import { sendEmbed } from "../service/send_embed_service";

export const downCommand = async (message: Message, authorIdCommand: string) => {
    const hourArrayLocation = 0;
    const nullBefore = 0;
    const minuteArrayLocation = 1;
    const maxMinutesForConvert = 60;
    const totalDayHours = 24;
    const convertForBraziliansTime = 3;
    const nullDiferece = 0;
    const numberNullHours = 1;

    const hoursBefore = Number(dataUsers[authorIdCommand][hourArrayLocation]);
    const minutesBefore = Number(dataUsers[authorIdCommand][minuteArrayLocation]);

    const hoursNow = Math.abs(Number(new Date().getHours().toLocaleString("pt-BR")) - convertForBraziliansTime);
    const minutesNow = Number(new Date().getMinutes().toLocaleString("pt-BR"));

    let totalMinutes;
    if (hoursBefore == hoursNow) totalMinutes = minutesNow - minutesBefore;
    else if (minutesBefore == nullBefore) totalMinutes = minutesNow + maxMinutesForConvert;
    else totalMinutes = Math.abs(maxMinutesForConvert - minutesBefore) + (minutesNow);

    let differenceHours = 0;

    differenceHours = hoursNow >= hoursBefore ? (hoursNow - hoursBefore) + differenceHours : Math.abs((hoursBefore - totalDayHours)) + hoursNow;

    if (differenceHours == numberNullHours) differenceHours = nullDiferece;
    else if (differenceHours != nullDiferece) differenceHours--;

    if (totalMinutes >= maxMinutesForConvert) {
        differenceHours++;
        totalMinutes = totalMinutes - maxMinutesForConvert;
    }

    const getUserDbForCheckIfUserExists = await getUserByIdService(authorIdCommand);

    await downCommandCheckIfUserExistsService({
        getUserDbForCheckIfUserExists: getUserDbForCheckIfUserExists,
        authorIdCommand: authorIdCommand,
        differenceHours: differenceHours,
        totalMinutes: totalMinutes,
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
        totalMinutes: totalMinutes,
        differenceHours: differenceHours,
    });
};
