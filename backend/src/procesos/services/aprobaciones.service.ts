import { HttpException, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Aprobaciones } from '../../entities';
import { CreateAprobacionesDto } from '../dto';
import { MENSSAGES } from 'src/constants';

@Injectable()
export class AprobacionesService {
  private AprobacionesRepository = AppDataSource.getRepository(Aprobaciones);

  async findAll() {
    const result = await this.AprobacionesRepository.find({
      order: { idFirmantes: 'ASC' },
    });

    return {
      statusCode: MENSSAGES.OK_STATUS,
      message: 'OK',
      data: result || [],
    };
  }

  async findAllUser(id: string) {
    const result = await this.AprobacionesRepository.find({
      where: { idFirmantes: id },
      relations: {
        firmantes_relation: true,
      },
    });

    if (result) {
      return {
        statusCode: MENSSAGES.OK_STATUS,
        message: MENSSAGES.MESSAGE_OK,
        data: result,
      };
    } else {
      throw new HttpException(
        MENSSAGES.MESSAGE_NOT_FOUND,
        MENSSAGES.NOT_FOUND_STATUS,
      );
    }
  }

  async findAllReg(id: string) {
    const result = await this.AprobacionesRepository.find({
      where: { idRegistroDoc: id },
      relations: {
        firmantes_relation: { usuario_relation: { unidad_relation: true } },
        registrodoc_relation: true,
      },
    });

    return {
      statusCode: MENSSAGES.OK_STATUS,
      message: MENSSAGES.MESSAGE_OK,
      data: result || [],
    };
  }

  async findOne(idFirmantes: string, idRegistroDoc: string, estado: string) {
    const result = await this.AprobacionesRepository.findOne({
      where: {
        idFirmantes: idFirmantes,
        idRegistroDoc: idRegistroDoc,
        estado: estado,
      },
    });

    if (!result) {
      return {
        statusCode: MENSSAGES.NOT_FOUND_STATUS,
        message: MENSSAGES.MESSAGE_NOT_FOUND,
        data: [],
      };
    }

    return {
      statusCode: MENSSAGES.OK_STATUS,
      message: MENSSAGES.MESSAGE_OK,
      data: result || [],
    };
  }

  async insert(body: CreateAprobacionesDto) {
    try {
      const result = this.AprobacionesRepository.create(body);
      await this.AprobacionesRepository.save(result);

      return {
        statusCode: MENSSAGES.CREATED_STATUS,
        message: MENSSAGES.MESSAGE_OK,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        `Error inserting data: ${error.message}`,
        MENSSAGES.INTERNAL_SERVER_ERROR_STATUS,
      );
    }
  }
}
