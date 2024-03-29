import { Controller, Get, Param } from '@nestjs/common';
import { FirmantesService } from '../services/firmantes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Firmantes')
@Controller('signatories')
export class FirmantesController {
  constructor(private readonly firmantesService: FirmantesService) {}

  @Get()
  async findAll() {
    return await this.firmantesService.findAll();
  }

  @Get('user/:id')
  async findAllUser(@Param('id') id: string) {
    return await this.firmantesService.findAllUser(id);
  }

  @Get('sig/:id')
  async findOne(@Param('id') id: string) {
    return await this.firmantesService.findOne(id);
  }

  @Get('cycle/:id')
  async findAllCycle(@Param('id') id: string) {
    return await this.firmantesService.findAllCycle(id);
  }

  @Get('count/:id')
  async countCycle(@Param('id') id: string) {
    return await this.firmantesService.countCycle(id);
  }
}
