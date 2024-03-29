import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClasificacionDocumentoService } from './clasificacion_documento.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClasificacionDocumentoDto } from './dto/create-clasificacion_Documento.dto';
import { UpdateClasificacionDocumentoDto } from './dto/update-clasificacion_Documento.dto';

@ApiTags('Clasificación de Documentos')
@Controller('classification')
export class ClasificacionDocumentoController {
  constructor(
    private readonly clasificacionDocumentoService: ClasificacionDocumentoService,
  ) {}

  @Get()
  async findAll() {
    return await this.clasificacionDocumentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clasificacionDocumentoService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateClasificacionDocumentoDto) {
    try {
      return this.clasificacionDocumentoService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateClasificacionDocumentoDto,
  ) {
    return this.clasificacionDocumentoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.clasificacionDocumentoService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
