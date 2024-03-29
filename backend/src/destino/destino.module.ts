import { Module } from '@nestjs/common';
import { DestinoController } from './destino.controller';
import { DestinoService } from './destino.service';

@Module({
  imports: [],
  controllers: [DestinoController],
  providers: [DestinoService],
  exports: [],
})
export class DestinoModule {}
