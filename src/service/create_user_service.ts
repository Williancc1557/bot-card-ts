import { querysServices } from "./service";
import type { UserQueryType } from "../types/types";

export const createUserService = async ({ id, hours, minutes }: UserQueryType) => {
    return querysServices.createUser({
        id: id,
        hours: hours,
        minutes: minutes,
    });
};