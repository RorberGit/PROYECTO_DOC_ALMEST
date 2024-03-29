import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { DestinoService } from './destino.service';

@Controller('destiny')
export class DestinoController {
  constructor(private readonly destinoService: DestinoService) {}

  @Post()
  create(@Body() createDestinoDto: CreateDestinoDto) {
    return this.destinoService.create(createDestinoDto);
  }

  @Get()
  findAll() {
    return this.destinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestinoDto: UpdateDestinoDto) {
    return this.destinoService.update(+id, updateDestinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destinoService.remove(+id);
  }
}
