import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProcedenciaDto } from './dto/create-procedencia.dto';
import { UpdateProcedenciaDto } from './dto/update-procedencia.dto';
import { AppDataSource } from 'src/data-source';
import { ProcedenciaEntity } from 'src/entities';

@Injectable()
export class ProcedenciaService {
  private ProcedenciaRepository =
    AppDataSource.getRepository(ProcedenciaEntity);

  async create(createProcedenciaDto: CreateProcedenciaDto) {
    try {
      const cargo = this.ProcedenciaRepository.create(createProcedenciaDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.ProcedenciaRepository.save(cargo),
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
        data: await this.ProcedenciaRepository.find({
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
    return `This action returns a #id procedencia`;
  }

  update(id: number, updateProcedenciaDto: UpdateProcedenciaDto) {
    return `This action updates a #id procedencia`;
  }

  remove(id: number) {
    return `This action removes a #id procedencia`;
  }
}
