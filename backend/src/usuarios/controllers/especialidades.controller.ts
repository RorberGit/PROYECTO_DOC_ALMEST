import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EspecialidadesService } from '../services/especialidades.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEspecialidadesDto } from '../dtos/create-especialidades.dto';
import { UpdateEspecialidadesDto } from '../dtos/update-especialidades.dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Especialidades')
@Controller('specialties')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Get()
  async findAll() {
    return await this.especialidadesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.especialidadesService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateEspecialidadesDto) {
    try {
      return this.especialidadesService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateEspecialidadesDto) {
    return this.especialidadesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.especialidadesService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
