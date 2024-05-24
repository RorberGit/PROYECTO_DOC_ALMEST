import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartamentosDto } from './create-departamentos.dto';

export class UpdateDepartamentosDto extends PartialType(CreateDepartamentosDto) {}
