import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Especialidades } from '../../entities/especialidades.entity';
import { CreateEspecialidadesDto } from '../dtos/create-especialidades.dto';
import { UpdateEspecialidadesDto } from '../dtos/update-especialidades.dto';

@Injectable()
export class EspecialidadesService {
  private EspecialidadesRepository =
    AppDataSource.getRepository(Especialidades);

  async findAll() {
    const especialidad = await this.EspecialidadesRepository.find({
      order: { nombre: 'ASC' },
    });

    if (especialidad.length) return especialidad;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    const especialidad = await this.EspecialidadesRepository.findOne({
      where: { id },
    });

    if (especialidad) return especialidad;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async insert(body: CreateEspecialidadesDto) {
    let especialidad = {};
    try {
      especialidad = this.EspecialidadesRepository.create(body);
      await this.EspecialidadesRepository.save(especialidad);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: especialidad,
    };
  }

  async update(id: string, body: UpdateEspecialidadesDto) {
    const preloadArea = {
      id,
      ...body,
    };

    const especialidad = await this.EspecialidadesRepository.preload(
      preloadArea,
    );

    if (especialidad) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.EspecialidadesRepository.save(especialidad),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const especialidad = await this.EspecialidadesRepository.findOne({
      where: { id },
    });

    if (especialidad) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.EspecialidadesRepository.remove(especialidad),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.EspecialidadesRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
