import { IsNotEmpty } from 'class-validator';

export class CreateRoleV1Request {
    @IsNotEmpty({
        message: 'Name is required',
    })
    name: string;

    @IsNotEmpty({
        message: 'Description is required',
    })
    description: string;
}
