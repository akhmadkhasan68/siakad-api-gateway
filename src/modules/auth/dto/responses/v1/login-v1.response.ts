import { formatDate, getDateNow, getUnixTimeNow } from "src/common/utils/date.util";
import { IUser } from "../../../interfaces/user.interface";
import { RoleV1Response } from "./role-v1.response";
import { config } from "src/config";

export class LoginV1Response {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;

        roles?: RoleV1Response[];
    };

    accessToken: string;
    accessTokenExpiresIn: string;

    static toResponse(user: IUser, accessToken: string): LoginV1Response {
        const now = getDateNow(config.timezone);
        const accessTokenExpiresIn = now.getTime() + config.jwt.expiresInMilisecond;
        const expiresInDate = new Date(accessTokenExpiresIn);

        const response = new LoginV1Response();
        response.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };

        if (user.roles) {
            response.user.roles = RoleV1Response.toResponses(user.roles);
        }

        response.accessToken = accessToken;
        response.accessTokenExpiresIn = formatDate(expiresInDate, config.dateFormat, config.timezone);
        
        return response;
    }
}
