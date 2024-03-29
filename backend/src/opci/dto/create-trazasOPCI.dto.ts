import { IsString } from 'class-validator';

export class CreateTrazasOPCIDto {
  @IsString()
  estado: string;

  @IsString()
  registrosOpciId: string;

  @IsString()
  UnidadId: string;

  @IsString()
  UsuarioId: string;
}
