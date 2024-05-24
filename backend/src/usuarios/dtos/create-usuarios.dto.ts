import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  roles: string;

  @ApiProperty()
  @IsString()
  idcargo: string;

  @ApiProperty()
  @IsString()
  idespecialidad: string;

  @ApiProperty()
  @IsString()
  idunidad: string;

  @ApiProperty()
  @IsOptional()
  @IsString()  
  public foto?: string | null;
}
