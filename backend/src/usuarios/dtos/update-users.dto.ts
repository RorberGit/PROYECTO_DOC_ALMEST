import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-usuarios.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
