import { IRole } from "src/modules/auth/interfaces/role.interface";
import { RoleGroupV1Response } from "./role-group-v1.response";

export class RoleV1Response {
    id: string;
    name: string;
    key: string;
    roleGroup?: RoleGroupV1Response;

    static toResponse(entity: IRole): RoleV1Response {
        const roleV1Response = new RoleV1Response();
        roleV1Response.id = entity.id;
        roleV1Response.name = entity.name;
        roleV1Response.key = entity.key;

        if (entity.roleGroup) {
            roleV1Response.roleGroup = RoleGroupV1Response.toResponse(entity.roleGroup);
        }

        return roleV1Response;
    }

    static toResponses(entities: IRole[]): RoleV1Response[] {
        return entities.map(entity => this.toResponse(entity));
    }
}
