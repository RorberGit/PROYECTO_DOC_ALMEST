import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProcedenciaDto {
  @ApiProperty()
  @IsString()
  nombre: string;
}
