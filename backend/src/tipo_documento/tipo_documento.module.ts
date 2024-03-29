import { Module } from '@nestjs/common';
import { TipoDocumentoController } from './tipo_documento.controller';
import { TipoDocumentoService } from './tipo_documento.service';

@Module({
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService],
})
export class TipoDocumentoModule {}
