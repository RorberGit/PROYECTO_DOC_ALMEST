import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { RegistroOPCiService } from '../services/registroOPCI.service';
import { CreateRegistroOPCIDto, UpdateRegistroOPCIDto } from '../dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Registro de OPCI')
@Controller('opci')
export class RegistroOPCIController {
  constructor(private readonly registroOPCIService: RegistroOPCiService) {}
  @Get()
  public async findAll() {
    return await this.registroOPCIService.findAll();
  }

  @Get('find/:id')
  async findId(@Param('id') id: string) {
    return await this.registroOPCIService.findId(id);
  }

  @Get('office/:nombre')
  async findByOffice(@Param('nombre') nombre: string) {
    return await this.registroOPCIService.findByOffice(nombre);
  }

  @Get('sequent')
  async consecutivo() {
    return await this.registroOPCIService.consecutivo();
  }

  @Post()
  async insert(@Body() body: CreateRegistroOPCIDto) {
    return await this.registroOPCIService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() Body: UpdateRegistroOPCIDto) {
    return this.registroOPCIService.update(id, Body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.registroOPCIService.remove(id);
  }
}
