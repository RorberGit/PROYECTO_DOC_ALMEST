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

@ApiTags('Registro de OPCI')
//@ ()
@Controller('opci')
export class RegistroOPCIController {
  constructor(private readonly registroOPCIService: RegistroOPCiService) {}
  @Auth()
  @Get()
  public async findAll() {
    return await this.registroOPCIService.findAll();
  }
  @Auth()
  @Get('find/:id')
  async findId(@Param('id') id: string) {
    return await this.registroOPCIService.findId(id);
  }
  @Auth()
  @Get('sequent')
  async consecutivo() {
    return await this.registroOPCIService.consecutivo();
  }

  @Auth()
  @Post()
  async insert(@Body() body: CreateRegistroOPCIDto) {
    return await this.registroOPCIService.insert(body);
  }

  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() Body: UpdateRegistroOPCIDto) {
    return this.registroOPCIService.update(id, Body);
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.registroOPCIService.remove(id);
  }
}
