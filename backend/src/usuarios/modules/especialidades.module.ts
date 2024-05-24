import { Module } from '@nestjs/common';
import { EspecialidadesController } from '../controllers/especialidades.controller';
import { EspecialidadesService } from '../services/especialidades.service';

@Module({
  controllers: [EspecialidadesController],
  providers: [EspecialidadesService],
})
export class EspecialidadesModule {}
