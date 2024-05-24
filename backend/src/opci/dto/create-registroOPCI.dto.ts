import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProcedenciaEntity, DestinoEntity, Unidades } from '../../entities';

export class CreateRegistroOPCIDto {
  @IsNumber()
  conteo: number;

  @IsString()
  codigo: string;

  @IsOptional()
  @IsString()
  fecha?: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  idTipoDocumento: string;

  @IsString()
  idClasificacion: string;

  @IsArray()
  unidades: Unidades[];

  @IsArray()
  procedencia: ProcedenciaEntity[];

  @IsArray()
  destino: DestinoEntity[];

  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  nota?: string;

  @IsOptional()
  @IsArray()
  file?: string[];
}
