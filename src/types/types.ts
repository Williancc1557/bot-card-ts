import type { Message } from "discord.js";
import type { QueryResult } from "pg";

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
    totalMinutes?: number;
    differenceHours?: number;
}

export interface DownCommandCheckIfUserExistsParamsType {
    getUserDbForCheckIfUserExists: QueryResult;
    authorIdCommand: string;
    differenceHours: number;
    totalMinutes: number;
}