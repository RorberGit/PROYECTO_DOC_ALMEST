import { Module } from '@nestjs/common';
import { CargosController } from '../controllers/cargos.controller';
import { CargosService } from '../services/cargos.service';

@Module({
  controllers: [CargosController],
  providers: [CargosService],
})
export class CargosModule {}
