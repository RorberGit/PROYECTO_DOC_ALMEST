import { Controller, Get, Post, Body } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { TrazasOPCiService } from '../services/trazasOPCI.service';
import { CreateTrazasOPCIDto } from '../dto';

@ApiTags('Trazas de OPCI')
//@ ()
@Controller('logopci')
export class TrazasOPCIController {
  constructor(private readonly trazasOPCIService: TrazasOPCiService) {}

  @Get()
  findAll() {
    return this.trazasOPCIService.findAll();
  }

  @Post()
  insert(@Body() body: CreateTrazasOPCIDto) {
    return this.trazasOPCIService.insert(body);
  }
}
