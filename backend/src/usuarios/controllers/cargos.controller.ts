import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CargosService } from '../services/cargos.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCargosDto } from '../dtos/create-cargos.dto';
import { UpdateCargosDto } from '../dtos/update-cargos.dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Cargos')
@Controller('positions')
export class CargosController {
  constructor(private readonly cargosService: CargosService) {}

  @Get()
  async findAll() {
    return await this.cargosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cargosService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateCargosDto) {
    try {
      return this.cargosService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCargosDto) {
    return this.cargosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.cargosService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
