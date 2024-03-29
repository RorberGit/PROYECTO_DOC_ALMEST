import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';

import { Departamentos } from '../../entities';

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
}
