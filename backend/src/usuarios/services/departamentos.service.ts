import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';

import { Departamentos } from '../../entities';
import { CreateDepartamentosDto, UpdateDepartamentosDto } from '../dtos';

const MESSAGE_OK = 'OK';
const MESSAGE_NOT_FOUND = 'Sin registros que mostrar';

@Injectable()
export class DepartamentosService {
  private DepartamentosRepo = AppDataSource.getRepository(Departamentos);

  //Obtener todos los registros------------------------------------------------------------
  async findAll() {
    const result = await this.DepartamentosRepo.find();

    if (result.length) {
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_OK,
        data: result,
      };
    } else {
      throw new HttpException(MESSAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async insert(body: CreateDepartamentosDto) {
    let area = {};
    try {
      area = this.DepartamentosRepo.create(body);
      await this.DepartamentosRepo.save(area);
    } catch (error) {
      return error;
      console.log('Error desde el servicio', error);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: area,
    };
  }

  async update(id: string, body: UpdateDepartamentosDto) {
    const preloadArea = {
      id,
      ...body,
    };

    const area = await this.DepartamentosRepo.preload(preloadArea);

    if (area) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.DepartamentosRepo.save(area),
      };
    } else {
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const result = await this.DepartamentosRepo.delete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
