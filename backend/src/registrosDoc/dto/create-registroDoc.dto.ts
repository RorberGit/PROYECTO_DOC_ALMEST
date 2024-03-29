import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  isNumber,
} from 'class-validator';
import { Unidades, Usuarios } from '../../entities';

export class CreateRegistroDocDto {
  @IsNumber()
  conteo: number;

  @IsString()
  codigo: string;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  year: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  idUnidad: string;

  @IsString()
  @IsNotEmpty()
  idUsuario: Usuarios;

  @IsString()
  @IsNotEmpty()
  TipoDocumentoID: string;

  @IsArray()
  @IsNotEmpty()
  destino: Unidades[];

  @IsString()
  estado: string;

  @IsNumber()
  ordenf: number;

  @IsString()
  file: string;
}
