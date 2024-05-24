import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnidadesService } from '../services/unidades.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUnidadesDto } from '../dtos/create-unidades.dto';
import { UpdateUnidadesDto } from '../dtos/update-unidades.dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Unidades')
@Controller('units')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Get()
  async findAll() {
    return await this.unidadesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.unidadesService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateUnidadesDto) {
    try {
      return this.unidadesService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUnidadesDto) {
    return this.unidadesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.unidadesService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
