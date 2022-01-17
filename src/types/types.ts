import type { Message } from "discord.js";

export interface UserQueryType {
    id: string;
    hours: number;
    minutes: number;
}

export interface EmbedTypesParams {
    message: Message;
    channelId: string;
    hoursBefore?: number;
    minutesBefore?: number;
    hoursNow?: number;
    minutesNow?: number;
    totalyMinutes?: number;
    differenceHours?: number;
}