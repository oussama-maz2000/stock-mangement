export type LoginCredentials = {
    email: string;
    password: string;

};

export type RequestLogin = {
    email: string;
    password: string;
}

export type ResponseLogin = {
    accessToken: string;
}