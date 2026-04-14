import {ApiEndpoint} from "./api.config";

export const API_AUTH_ENDPOINTS = {
   LOGIN: { path: 'auth/login' },

} satisfies Record<string, ApiEndpoint>;
