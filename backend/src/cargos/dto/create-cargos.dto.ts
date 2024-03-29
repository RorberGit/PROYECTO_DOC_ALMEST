import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCargosDto {
  @ApiProperty()
  @IsString()
  nombre: string;
}
