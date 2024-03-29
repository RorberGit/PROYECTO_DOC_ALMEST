import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOtrasEntidadesDto {
  @ApiProperty()
  @IsString()
  nombre: string;
}
