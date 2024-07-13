import { IBaseEntity } from "src/common/interfaces/base-entity.interface";

export interface IPasswordResetToken extends IBaseEntity {
    token: string;
    email: string;
    expiredAt: Date;
    isExpired: boolean;
    verifiedAt: Date;
    isVerified: boolean;
}
