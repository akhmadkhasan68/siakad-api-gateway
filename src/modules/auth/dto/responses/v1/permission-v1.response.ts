import { IPermission } from "src/modules/auth/interfaces/permission.interface";

export class PermissionV1Response {
    id: string;
    name: string;
    key: string;
    description: string;
    
    static toResponse(entity: IPermission): PermissionV1Response {
        const permissionV1Response = new PermissionV1Response();
        permissionV1Response.id = entity.id;
        permissionV1Response.name = entity.name;
        permissionV1Response.key = entity.key;
        permissionV1Response.description = entity.description;

        return permissionV1Response;
    }

    static toResponses(entities: IPermission[]): PermissionV1Response[] {
        return entities.map(entity => this.toResponse(entity));
    }
}
