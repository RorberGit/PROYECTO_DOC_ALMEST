import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DepartamentosService } from '../services/departamentos.service';

@ApiTags('Departamentos')
//@ ()
@Controller('office')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }
}
