import { ApiEndpoint } from "./api.config";

export const API_USERS_ENDPOINTS = {
    FETCH_USERS: { path: 'users', httpVerb: "GET" },
    SAVE_USER: { path: 'users', httpVerb: 'POST' },
    UPDATE_PROFILE: { path: 'users/profile', httpVerb: 'PUT' },

} satisfies Record<string, ApiEndpoint>;
