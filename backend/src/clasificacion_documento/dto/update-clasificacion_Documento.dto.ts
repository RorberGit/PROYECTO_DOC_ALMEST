import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificacionDocumentoDto } from './create-clasificacion_Documento.dto';

export class UpdateClasificacionDocumentoDto extends PartialType(
  CreateClasificacionDocumentoDto,
) {}
