import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsuariosService } from '../services/usuarios.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from '../dtos/create-usuarios.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { Auth } from 'src/common';

@Auth()
@ApiTags('Usuarios')
@Controller('users')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get('user/:value')
  async findByUser(@Param('value') value: string) {
    return await this.usersService.findByUser(value);
  }

  @Get('unit/:value')
  async findByUnit(@Param('value') value: string) {
    return await this.usersService.findByUnit(value);
  }

  @Post()
  insert(@Body() body: CreateUsersDto) {
    console.info('body :>', body);
    try {
      return this.usersService.insert(body);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  }
}
