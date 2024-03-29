import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAreasDto {
  @ApiProperty()
  @IsString()
  nombre: string;
}
