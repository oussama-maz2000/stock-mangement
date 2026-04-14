export class RoleDto{
    id!:string;
    name!: string;

    constructor(data?: Partial<RoleDto>) {
        Object.assign(this, data);
    }
}