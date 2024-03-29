import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Flujo } from '../../entities';

const MESSAGE_OK = 'OK';
const MESSAGE_NOT_FOUND = 'Sin registros que mostrar';
@Injectable()
export class FlujoService {
  private flujoRepository = AppDataSource.getRepository(Flujo);

  async findAll() {
    const result = await this.flujoRepository.find({
      order: { idUnidad: 'ASC' },
    });

    if (!result) {
      throw new HttpException(MESSAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGE_OK,
      data: result,
    };
  }

  async findOne(
    TipoDocumentoID: string,
    idUnidad: string,
    idTerritorio: string,
  ) {
    const result = await this.flujoRepository.findOne({
      where: {
        TipoDocumentoID: TipoDocumentoID,
        idUnidad: idUnidad,
        idTerritorio: idTerritorio,
      },
    });

    if (!result) {
      throw new HttpException(MESSAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGE_OK,
      data: result,
    };
  }
}
