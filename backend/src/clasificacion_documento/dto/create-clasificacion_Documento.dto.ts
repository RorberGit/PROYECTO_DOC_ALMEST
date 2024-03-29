import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClasificacionDocumentoDto {
  @ApiProperty()
  @IsString()
  nombre: string;
}
