import { Expose, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { IPaginateRequest, ISortRequest } from "../interfaces/index.interface";
import { OrderDirectionEnum, OrderDirectionType } from "../enums/index.enum";

export class PaginateRequest implements IPaginateRequest, ISortRequest {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Expose({
        name: 'per_page'
    })
    perPage?: number;

    @IsOptional()
    keyword?: string;

    @IsOptional()
    sort?: string;

    @IsOptional()
    @IsEnum(OrderDirectionEnum)
    order?: OrderDirectionType;
}
