export interface UserDto {
    id: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    enabled: boolean;
    deleted: boolean;
}

export interface AddUserDto {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    roleId: string;
}


export interface User {
    id: string | undefined;
    username: string | undefined;
    fullName: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    role: string | undefined;
    enabled: boolean | undefined;
    deleted: boolean | undefined;
}

export interface UserFilter {
    fullName?: string;
    username?: string;
    email?: string;
    phone?: string;
    roleId?: string;
    enabled?: boolean;
}

export interface UpdateProfileDto {
    fullName?: string;
    email?: string;
    phone?: string;

}

