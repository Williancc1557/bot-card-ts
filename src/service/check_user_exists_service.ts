import type { DownCommandCheckIfUserExistsParamsType } from "../types/types";
import { createUserService } from "./create_user_service";
import { updateUserFromIdService } from "./update_user_service";

export const downCommandCheckIfUserExistsService = async ({ getUserDbForCheckIfUserExists, authorIdCommand, differenceHours, totalMinutes }: DownCommandCheckIfUserExistsParamsType) => {
    const notExistsUser = 0;
    const firstRow = 0;
    if (getUserDbForCheckIfUserExists.rowCount === notExistsUser) {
        return createUserService({
            id: authorIdCommand,
            hours: differenceHours,
            minutes: totalMinutes,
        });
    } else {
        return updateUserFromIdService({
            id: authorIdCommand,
            hours: differenceHours + getUserDbForCheckIfUserExists.rows[firstRow].hours,
            minutes: totalMinutes + getUserDbForCheckIfUserExists.rows[firstRow].minutes,
        });
    }
};