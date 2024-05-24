import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProcedenciaDto } from './dto/create-procedencia.dto';
import { UpdateProcedenciaDto } from './dto/update-procedencia.dto';
import { ProcedenciaService } from './procedencia.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Procedencia')
@Controller('origin')
export class ProcedenciaController {
  constructor(private readonly procedenciaService: ProcedenciaService) {}

  @Post()
  create(@Body() createProcedenciaDto: CreateProcedenciaDto) {
    return this.procedenciaService.create(createProcedenciaDto);
  }

  @Get()
  async findAll() {
    return await this.procedenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedenciaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcedenciaDto: UpdateProcedenciaDto,
  ) {
    return this.procedenciaService.update(id, updateProcedenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedenciaService.remove(id);
  }
}
