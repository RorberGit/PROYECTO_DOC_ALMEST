import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';

import { TrazasOPCI } from '../../entities/trazasOPCI.entity';
import { CreateTrazasOPCIDto } from '../dto';

const MESSAGE_OK = 'OK';
const MESSAGE_NOT_FOUND = 'Sin registros que mostrar';

@Injectable()
export class TrazasOPCiService {
  private TrazasOPCiRepo = AppDataSource.getRepository(TrazasOPCI);

  //Obtener todos los registros------------------------------------------------------------
  async findAll() {
    const result = await this.TrazasOPCiRepo.find({
      relations: {
        usuario_relation: true,
        unidad_relation: true,
      },
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

  //Insertar registros---------------------------------------------------------------------
  async insert(body: CreateTrazasOPCIDto) {
    let result = {};
    console.log(body);
    try {
      const newregistro = new TrazasOPCI();
      newregistro.estado = body.estado;
      newregistro.registrosOpciId = body.registrosOpciId;
      newregistro.UnidadId = body.UnidadId;
      newregistro.UsuarioId = body.UsuarioId;

      console.log(newregistro);

      result = this.TrazasOPCiRepo.create(newregistro);
      await this.TrazasOPCiRepo.save(result);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: result,
    };
  }
}
