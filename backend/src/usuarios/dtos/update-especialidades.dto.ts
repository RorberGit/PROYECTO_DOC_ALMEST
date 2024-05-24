import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadesDto } from './create-especialidades.dto';

export class UpdateEspecialidadesDto extends PartialType(
  CreateEspecialidadesDto,
) {}
