import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { RolesENUM } from '../enum/users.enum';
import { Areas } from 'src/areas';
import { Cargos } from 'src/cargos';
import { Especialidades } from 'src/especialidades';

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
  @IsEnum(RolesENUM)
  roles: RolesENUM; //enum SI y NO

  @ApiProperty()
  @IsString()
  idarea: string;

  @ApiProperty()
  @IsString()
  idcargo: string;

  @ApiProperty()
  @IsString()
  idespecialidad: string;

  @ApiProperty()
  @IsString()
  idunidad: string;
}
