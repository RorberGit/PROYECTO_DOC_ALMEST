import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { AppDataSource } from 'src/data-source';
import { DestinoEntity } from 'src/entities';
import { MESSAGE_ERROR } from 'src/common/constantes.const';

@Injectable()
export class DestinoService {
  private DBRepository = AppDataSource.getRepository(DestinoEntity);

  async create(createDestinoDto: CreateDestinoDto) {
    try {
      const result = this.DBRepository.create(createDestinoDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.DBRepository.save(result),
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
      return await this.DBRepository.find({
        order: { nombre: 'ASC' },
      });
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

  async findOne(id: string) {
    try {
      return await this.DBRepository.findOne({
        where: { id },
        order: { nombre: 'ASC' },
      });
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

  async update(id: string, updateDestinoDto: UpdateDestinoDto) {
    try {
      const preload = {
        id,
        ...updateDestinoDto,
      };

      const result = await this.DBRepository.preload(preload);

      if (result) {
        return {
          statusCode: HttpStatus.OK,
          data: await this.DBRepository.save(result),
        };
      } else {
        throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
      }
    } catch (error) {
      throw new ForbiddenException({
        error: MESSAGE_ERROR.UPDATE,
        cause: error,
      });
    }
  }

  async remove(id: string) {
    const result = await this.DBRepository.findOne({ where: { id } });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        data: await this.DBRepository.remove(result),
      };
    }

    throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
  }
}
