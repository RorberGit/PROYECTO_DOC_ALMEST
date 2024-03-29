import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUnidadesDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  key: string;
}
