import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAreasDto } from './dto/create-areas.dto';
import { UpdateAreasDto } from './dto/update-areas.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';

@ApiTags('Areas')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  async findAll() {
    return await this.areasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.areasService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateAreasDto) {
    try {
      return this.areasService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAreasDto) {
    return this.areasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.areasService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
