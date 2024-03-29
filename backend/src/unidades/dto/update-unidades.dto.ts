import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesDto } from './create-unidades.dto';

export class UpdateUnidadesDto extends PartialType(CreateUnidadesDto) {}
