import {ApiEndpoint} from "./api.config";

export const API_ROLES_ENDPOINTS = {
    FETCH_ROLES: { path: 'roles',httpVerb: "GET" },

} satisfies Record<string, ApiEndpoint>;