import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/auth.decorator';
import { RegistroDocService } from './registroDoc.service';
import { CreateRegistroDocDto, UpdateRegistroDocDto } from './dto';

@ApiTags('Registro de Documentos')
//@ ()
@Controller('register')
export class RegistroDocController {
  constructor(private readonly registroDocService: RegistroDocService) {}

  @Get()
  findAll() {
    return this.registroDocService.findAll();
  }

  @Get('unit/:id')
  findAllUnidadId(@Param('id') id: string) {
    return this.registroDocService.findAllUnidadId(id);
  }

  @Get('regi/:id')
  findOne(@Param('id') id: string) {
    return this.registroDocService.findOne(id);
  }

  @Get('reg')
  findAllReg(@Query() query: any) {
    const idClasificacion = query.idClasificacion;
    const idUnidad = query.idUnidad;
    const idTerritorio = query.idTerritorio;
    const estado = query.estado;

    return this.registroDocService.findAllReg(
      idClasificacion,
      idUnidad,
      idTerritorio,
      estado,
    );
  }

  @Get('/:unit/:year')
  consecutivo(@Param('unit') unit: string, @Param('year') year: string) {
    return this.registroDocService.consecutivo(unit as any, year);
  }

  //@Auth()
  @Post()
  insert(@Body() createSistemaRegDto: CreateRegistroDocDto) {
    return this.registroDocService.insert(createSistemaRegDto);
  }

  /*
  @Get('cons/:unit/:year')
  consecutivo(@Param('unit') unit: string, @Param('year') year: string) {
    console.warn('unidad', unit);
    console.warn('año', year);
    return this.registroDocService.consecutivo(unit as any, year);
  }
*/
  //@Auth()

  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() Body: UpdateRegistroDocDto) {
    return this.registroDocService.update(id, Body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.registroDocService.remove(id);
  }
}
