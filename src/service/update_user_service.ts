import { querysServices } from "./service";
import type { UserQueryType } from "../types/types";

export const updateUserFromIdService = async ({ id, hours, minutes }: UserQueryType) => {
    return querysServices.updateUserFromId({
        id: id,
        hours: hours,
        minutes: minutes,
    });
};