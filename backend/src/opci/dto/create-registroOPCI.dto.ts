import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Departamentos,
  ProcedenciaEntity,
  DestinoEntity,
} from '../../entities';

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
  TipoDocumentoID: string;

  @IsString()
  ClasificacionDocumentoID: string;

  @IsArray()
  departamentos: Departamentos[];

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
