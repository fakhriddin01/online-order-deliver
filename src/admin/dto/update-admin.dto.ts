import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto {
    full_name?: string;
    phone_number?: string;
    email?: string;
    tg_link?: string;
}
