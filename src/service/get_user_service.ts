import { querysServices } from "./service";

export const getUserByIdService = async (userId: string) => querysServices.getUsersById(userId);