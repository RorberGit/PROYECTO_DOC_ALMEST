import { Module } from '@nestjs/common';
import { FirmantesController } from '../controllers/firmantes.controller';
import { FirmantesService } from '../services/firmantes.service';

@Module({
  controllers: [FirmantesController],
  providers: [FirmantesService],
})
export class FirmantesModule {}
