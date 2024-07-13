import { IBaseEntity } from "src/common/interfaces/base-entity.interface";

export interface IOtp extends IBaseEntity {
    code: string;
    email: string;
    expiredAt: Date;
    isExpired: boolean;
    verifiedAt: Date;
    isVerified: boolean;
}
