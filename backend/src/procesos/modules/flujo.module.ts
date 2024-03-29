import { Module } from '@nestjs/common';
import { FlujoService } from '../services';
import { FlujoController } from '../controllers';

@Module({
  controllers: [FlujoController],
  providers: [FlujoService],
})
export class FlujoModule {}
