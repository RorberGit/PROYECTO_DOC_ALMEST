import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TipoDocumentoService } from './tipo_documento.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTipoDocumentoDto } from './dto/create-tipo_documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo_documento.dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Tipo de Documentos')
@Controller('type')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Get()
  async findAll() {
    return await this.tipoDocumentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tipoDocumentoService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateTipoDocumentoDto) {
    try {
      return this.tipoDocumentoService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTipoDocumentoDto) {
    return this.tipoDocumentoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.tipoDocumentoService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
