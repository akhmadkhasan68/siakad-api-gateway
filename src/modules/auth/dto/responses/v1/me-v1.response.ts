import { IUser } from "src/modules/auth/interfaces/user.interface";

export class MeV1Response {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    secondaryPhone: string;

    static toResponse(user: IUser): MeV1Response {
        const response = new MeV1Response();
        response.id = user.id;
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        response.email = user.email;
        response.secondaryEmail = user.secondaryEmail;
        response.phone = user.phone;
        response.secondaryPhone = user.secondaryPhone;
        return response;
    }
}
