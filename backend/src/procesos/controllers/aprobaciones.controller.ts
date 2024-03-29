import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { AprobacionesService } from '../services/aprobaciones.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAprobacionesDto } from '../dto';

@ApiTags('Aprobaciones')
@Controller('approbations')
export class AprobacionesController {
  constructor(private readonly aprobacionesService: AprobacionesService) {}

  @Get()
  async findAll() {
    return await this.aprobacionesService.findAll();
  }

  @Get('user/:id')
  async findAllUser(@Param('id') id: string) {
    return await this.aprobacionesService.findAllUser(id);
  }

  @Get('reg/:id')
  async findAllReg(@Param('id') id: string) {
    return await this.aprobacionesService.findAllReg(id);
  }

  @Get('acept')
  async findOne(@Query() query: any) {
    const idFirmantes = query.idFirmantes;
    const idRegistroDoc = query.idRegistroDoc;
    const estado = query.estado;

    return await this.aprobacionesService.findOne(
      idFirmantes,
      idRegistroDoc,
      estado,
    );
  }

  @Post()
  insert(@Body() createAprobacionesDto: CreateAprobacionesDto) {
    return this.aprobacionesService.insert(createAprobacionesDto);
  }
}
