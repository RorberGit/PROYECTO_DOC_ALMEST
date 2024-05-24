import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DepartamentosService } from '../services/departamentos.service';
import { CreateDepartamentosDto, UpdateDepartamentosDto } from '../dtos';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Departamentos')
@Controller('office')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Post()
  insert(@Body() body: CreateDepartamentosDto) {
    try {
      return this.departamentosService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateDepartamentosDto) {
    return this.departamentosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.departamentosService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
