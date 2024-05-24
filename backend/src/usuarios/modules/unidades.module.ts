import { Module } from '@nestjs/common';
import { UnidadesController } from '../controllers/unidades.controller';
import { UnidadesService } from '../services/unidades.service';

@Module({
  controllers: [UnidadesController],
  providers: [UnidadesService],
})
export class UnidadesModule {}
