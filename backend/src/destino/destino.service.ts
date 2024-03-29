import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { AppDataSource } from 'src/data-source';
import { DestinoEntity } from 'src/entities';

@Injectable()
export class DestinoService {
  private DBRepository = AppDataSource.getRepository(DestinoEntity);

  async create(createDestinoDto: CreateDestinoDto) {
    try {
      const cargo = this.DBRepository.create(createDestinoDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.DBRepository.save(cargo),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error al crear el registro',
          cause: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAll() {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.DBRepository.find({
          order: { nombre: 'ASC' },
        }),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error al obtener el registro',
          cause: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #id destino`;
  }

  update(id: number, updateDestinoDto: UpdateDestinoDto) {
    return `This action updates a #id destino`;
  }

  remove(id: number) {
    return `This action removes a #id destino`;
  }
}
