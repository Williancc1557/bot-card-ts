import { db } from "../infra/db";
import type { UserQueryType } from "../types/types";

export default class {
    public updateUserFromId = async ({ id, hours, minutes }: UserQueryType) => db.query(`UPDATE users SET hours = '${hours}', minutes = '${minutes}' WHERE user_id = '${id}'`);


    public createUser = async ({ id, hours, minutes }: UserQueryType) => db.query(`INSERT INTO users (user_id, hours, minutes) VALUES (${id}, '${hours}', '${minutes}')`);


    public getUsersById = async (id: string) => db.query(`SELECT * FROM users WHERE user_id = '${id}'`);
}