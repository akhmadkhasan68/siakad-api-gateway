import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginateRequest } from 'src/common/requests/paginate.request';

export class PermissionPaginateV1Request extends PaginateRequest {
    @IsOptional()
    @IsUUID('4')
    @Expose({
        name: 'role_id',
    })
    roleId?: string;
}
