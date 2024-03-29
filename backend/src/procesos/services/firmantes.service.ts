import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Firmantes } from '../../entities';

const MESSAGE_OK = 'OK';
const MESSAGE_NOT_FOUND = 'Sin registros que mostrar';
@Injectable()
export class FirmantesService {
  private FirmantesRepository = AppDataSource.getRepository(Firmantes);

  async findAll() {
    const result = await this.FirmantesRepository.find({
      order: { idUsuario: 'ASC' },
    });

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

  async findAllUser(id: string) {
    const result = await this.FirmantesRepository.find({
      where: { idUsuario: id },
      relations: {
        flujo_relation: true,
      },
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

  async findOne(id: string) {
    const result = await this.FirmantesRepository.findOne({
      where: { id },
      relations: {
        flujo_relation: true,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: result || [],
    };
  }

  async findAllCycle(id: string) {
    const result = await this.FirmantesRepository.find({
      where: { idFlujo: id },
      relations: {
        flujo_relation: true,
      },
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

  async countCycle(id: string) {
    const result = await this.FirmantesRepository.count({
      where: { idFlujo: id },
    });

    if (result) {
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
