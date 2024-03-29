import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OtrasEntidadesService } from './otrasEntidades.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOtrasEntidadesDto, UpdateOtrasEntidadesDto } from './dto';


@ApiTags('Otras Entidades')
@Controller('otherentity')
export class OtrasEntidadesController {
  constructor(private readonly otrasEntidadesService: OtrasEntidadesService) {}

  @Get()
  async findAll() {
    return await this.otrasEntidadesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.otrasEntidadesService.findOne(id);
  }

  @Post()
  insert(@Body() body: CreateOtrasEntidadesDto) {
    try {
      return this.otrasEntidadesService.insert(body);
    } catch (error) {
      return error;
      console.log('Error desde el API', error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateOtrasEntidadesDto) {
    return this.otrasEntidadesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.otrasEntidadesService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
