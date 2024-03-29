import { Module } from '@nestjs/common';
import { TrazasOPCIController } from '../controllers/trazasOPCI.controller';
import { TrazasOPCiService } from '../services/trazasOPCI.service';

@Module({
  controllers: [TrazasOPCIController],
  providers: [TrazasOPCiService],
})
export class TrazasOPCIModule {}
