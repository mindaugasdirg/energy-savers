import { options } from "../config";

export const getApiUrl = (path: string) => `${options.API_URL}${path}`;