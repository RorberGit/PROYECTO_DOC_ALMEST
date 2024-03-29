import { Module } from '@nestjs/common';
import { AprobacionesController } from '../controllers/aprobaciones.controller';
import { AprobacionesService } from '../services/aprobaciones.service';

@Module({
  controllers: [AprobacionesController],
  providers: [AprobacionesService],
})
export class AprobacionesModule {}
