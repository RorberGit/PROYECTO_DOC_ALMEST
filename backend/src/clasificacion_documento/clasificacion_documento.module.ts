import { Module } from '@nestjs/common';
import { ClasificacionDocumentoController } from './clasificacion_documento.controller';
import { ClasificacionDocumentoService } from './clasificacion_documento.service';

@Module({
  controllers: [ClasificacionDocumentoController],
  providers: [ClasificacionDocumentoService],
})
export class ClasificacionDocumentoModule {}
