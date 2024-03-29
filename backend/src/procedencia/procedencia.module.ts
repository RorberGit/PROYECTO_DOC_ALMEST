import { Module } from '@nestjs/common';
import { ProcedenciaController, ProcedenciaService } from '.';

@Module({
  imports: [],
  controllers: [ProcedenciaController],
  providers: [ProcedenciaService],
  exports: [],
})
export class ProcedenciaModule {}
