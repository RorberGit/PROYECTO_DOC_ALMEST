import { PartialType } from '@nestjs/mapped-types';
import { CreateProcedenciaDto } from '.';

export class UpdateProcedenciaDto extends PartialType(
  CreateProcedenciaDto,
) {}
