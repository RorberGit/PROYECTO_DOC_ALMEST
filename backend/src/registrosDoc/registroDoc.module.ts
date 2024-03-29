import { Module } from '@nestjs/common';
import { RegistroDocService } from './registroDoc.service';
import { RegistroDocController } from './registroDoc.controller';

@Module({
  controllers: [RegistroDocController],
  providers: [RegistroDocService],
})
export class registroDocModule {}
