import { Module } from '@nestjs/common';

import { DepartamentosService } from '../services/departamentos.service';
import { DepartamentosController } from '../controllers/departamentos.controller';

@Module({
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
})
export class DepartamentosModule {}
