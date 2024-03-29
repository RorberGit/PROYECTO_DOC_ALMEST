import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateOtrasEntidadesDto, UpdateOtrasEntidadesDto } from './dto';
import { OtrasEntidades } from '../entities';

@Injectable()
export class OtrasEntidadesService {
  private OtrasEntidadesRepository =
    AppDataSource.getRepository(OtrasEntidades);

  async findAll() {
    const result = await this.OtrasEntidadesRepository.find({
      order: { nombre: 'ASC' },
    });

    if (result.length) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: result,
      };
    } else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    const result = await this.OtrasEntidadesRepository.findOne({
      where: { id },
    });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: result,
      };
    } else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async insert(body: CreateOtrasEntidadesDto) {
    let flag = {};

    try {
      flag = this.OtrasEntidadesRepository.create(body);
      await this.OtrasEntidadesRepository.save(flag);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: flag,
    };
  }

  async update(id: string, body: UpdateOtrasEntidadesDto) {
    const Preload = {
      id,
      ...body,
    };

    const result = await this.OtrasEntidadesRepository.preload(Preload);

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.OtrasEntidadesRepository.save(result),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const result = await this.OtrasEntidadesRepository.findOne({
      where: { id },
    });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.OtrasEntidadesRepository.remove(result),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.OtrasEntidadesRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
