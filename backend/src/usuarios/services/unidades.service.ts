import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Unidades } from '../../entities/unidades.entity';
import { CreateUnidadesDto } from '../dtos/create-unidades.dto';
import { UpdateUnidadesDto } from '../dtos/update-unidades.dto';
import { Not } from 'typeorm';

@Injectable()
export class UnidadesService {
  private UnidadesRepository = AppDataSource.getRepository(Unidades);

  async findAll() {
    const unidad = await this.UnidadesRepository.find({
      order: { nombre: 'ASC' },
      where: { nombre: Not('Administración') },
    });

    if (unidad.length) return unidad;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    const unidad = await this.UnidadesRepository.findOne({
      where: { id },
    });

    if (unidad) return unidad;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async insert(body: CreateUnidadesDto) {
    let unidad = {};
    try {
      unidad = this.UnidadesRepository.create(body);
      await this.UnidadesRepository.save(unidad);
    } catch (error) {
      return error;
      console.log('Error desde el servicio', error);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: unidad,
    };
  }

  async update(id: string, body: UpdateUnidadesDto) {
    const preloadCargo = {
      id,
      ...body,
    };

    const unidad = await this.UnidadesRepository.preload(preloadCargo);

    if (unidad) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.UnidadesRepository.save(unidad),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const unidad = await this.UnidadesRepository.findOne({ where: { id } });

    if (unidad) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.UnidadesRepository.remove(unidad),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.UnidadesRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
