import { PartialType } from '@nestjs/mapped-types';
import { CreateOtrasEntidadesDto } from './create-otrasEntidades.dto';

export class UpdateOtrasEntidadesDto extends PartialType(CreateOtrasEntidadesDto) {}