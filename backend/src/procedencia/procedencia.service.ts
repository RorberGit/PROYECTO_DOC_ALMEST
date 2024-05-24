import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcedenciaDto } from './dto/create-procedencia.dto';
import { UpdateProcedenciaDto } from './dto/update-procedencia.dto';
import { AppDataSource } from 'src/data-source';
import { ProcedenciaEntity } from 'src/entities';
import { MESSAGE_ERROR } from 'src/common/constantes.const';

@Injectable()
export class ProcedenciaService {
  private ProcedenciaRepository =
    AppDataSource.getRepository(ProcedenciaEntity);

  async create(createProcedenciaDto: CreateProcedenciaDto) {
    try {
      const result = this.ProcedenciaRepository.create(createProcedenciaDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.ProcedenciaRepository.save(result),
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
      return await this.ProcedenciaRepository.find({
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
      return await this.ProcedenciaRepository.findOne({
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

  async update(id: string, updateProcedenciaDto: UpdateProcedenciaDto) {
    try {
      const preload = {
        id,
        ...updateProcedenciaDto,
      };

      const result = await this.ProcedenciaRepository.preload(preload);

      if (result) {
        return {
          statusCode: HttpStatus.OK,
          data: await this.ProcedenciaRepository.save(result),
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
    const result = await this.ProcedenciaRepository.findOne({ where: { id } });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        data: await this.ProcedenciaRepository.remove(result),
      };
    }

    throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
  }
}
