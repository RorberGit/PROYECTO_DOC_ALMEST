import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FlujoService } from '../services';

@ApiTags('Ciclos')
@Controller('cycle')
export class FlujoController {
  constructor(private readonly flujoService: FlujoService) {}

  @Get()
  async findAll() {
    return await this.flujoService.findAll();
  }

  @Get('sig')
  async findOne(@Query() query: any) {
    const idClasificacion = query.idClasificacion;
    const idUnidad = query.idUnidad;
    const idTerritorio = query.idTerritorio;

    return await this.flujoService.findOne(
      idClasificacion,
      idUnidad,
      idTerritorio,
    );
  }
}
