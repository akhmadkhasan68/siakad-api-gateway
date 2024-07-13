import { IBaseEntity } from "src/common/interfaces/base-entity.interface";
import { IPermission } from "./permission.interface";
import { IRoleGroup } from "./role-group.interface";
import { IUser } from "./user.interface";


export interface IRole extends IBaseEntity {
    roleGroup: IRoleGroup;
    name: string;
    key: string;
    description: string;
    permissions?: IPermission[];
    users?: IUser[];
}
