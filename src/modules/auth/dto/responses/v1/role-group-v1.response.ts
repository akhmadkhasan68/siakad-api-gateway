import { IRoleGroup } from "src/modules/auth/interfaces/role-group.interface";

export class RoleGroupV1Response {
    id: string;
    name: string;
    key: string;

    static toResponse(entity: IRoleGroup): RoleGroupV1Response {
        const roleGroupV1Response = new RoleGroupV1Response();
        roleGroupV1Response.id = entity.id;
        roleGroupV1Response.name = entity.name;
        roleGroupV1Response.key = entity.key;

        return roleGroupV1Response;
    }
}
