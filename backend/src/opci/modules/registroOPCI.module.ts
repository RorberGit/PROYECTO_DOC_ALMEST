import { Module } from '@nestjs/common';
import { RegistroOPCIController } from '../controllers/registroOPCI.controller';
import { RegistroOPCiService } from '../services/registroOPCI.service';

@Module({
  controllers: [RegistroOPCIController],
  providers: [RegistroOPCiService],
})
export class RegistroOPCIModule {}
