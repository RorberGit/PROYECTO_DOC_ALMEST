import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAprobacionesDto {
  @ApiProperty()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsString()
  observaciones: string;

  @ApiProperty()
  @IsString()
  idFirmantes: string;

  @ApiProperty()
  @IsString()
  idRegistroDoc: string;
}
