import { PartialType } from '@nestjs/mapped-types';
import { CreateAprobacionesDto } from './create-aprobaciones.dto';

export class UpdateAprobacionesDto extends PartialType(CreateAprobacionesDto) {}
