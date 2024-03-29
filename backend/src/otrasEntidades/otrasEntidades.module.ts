import { Module } from '@nestjs/common';
import { OtrasEntidadesController } from './otrasEntidades.controller';
import { OtrasEntidadesService } from './otrasEntidades.service';

@Module({
  controllers: [OtrasEntidadesController],
  providers: [OtrasEntidadesService],
})
export class OtrasEntidadesModule {}
