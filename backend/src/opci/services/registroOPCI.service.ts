import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppDataSource } from 'src/data-source';

import {
  Unidades,
  RegistroOPCI,
  ProcedenciaEntity,
  DestinoEntity,
} from '../../entities';
import { In } from 'typeorm';
import { CreateRegistroOPCIDto, UpdateRegistroOPCIDto } from '../dto';
import { MESSAGE_ERROR } from 'src/common/constantes.const';

@Injectable()
export class RegistroOPCiService {
  private RegistroOPCIRepo = AppDataSource.getRepository(RegistroOPCI);
  private Procedencia = AppDataSource.getRepository(ProcedenciaEntity);
  private Destino = AppDataSource.getRepository(DestinoEntity);
  private UnidadesRepo = AppDataSource.getRepository(Unidades);

  //Obtener todos los registros------------------------------------------------------------
  async findAll() {
    const response = await this.RegistroOPCIRepo.find({
      relations: {
        clasificacion_relation: true,
        tipodocumento_relation: true,
        procedencia: true,
        destino: true,
        unidades: true,
        trazasOpciId: true,
      },
      order: { conteo: 'DESC' },
    });

    if (response.length) {
      return response;
    } else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  //Obtener todos los registros------------------------------------------------------------
  async findId(id: string) {
    const response = await this.RegistroOPCIRepo.findOne({
      where: { id },
      relations: {
        clasificacion_relation: true,
        tipodocumento_relation: true,
        unidades: true,
        procedencia: true,
        destino: true,
        trazasOpciId: {
          usuario_relation: true,
          unidad_relation: true,
        },
      },
    });

    if (response) return response;
    else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  //Buscar un departamento---------------------------------------------------------------
  async findByOffice(nombre: string) {
    const response = await this.RegistroOPCIRepo.find({
      where: {
        unidades: {
          nombre: nombre,
        },
      },
      relations: {
        clasificacion_relation: true,
        tipodocumento_relation: true,
        unidades: true,
        procedencia: true,
        destino: true,
        trazasOpciId: {
          usuario_relation: true,
          unidad_relation: true,
        },
      },
      order: { conteo: 'DESC' },
    });

    if (response) return response;
    else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  //Función para Obtener el consecutivo del REGA--------------------------------------------
  async consecutivo() {
    const maxi = await this.RegistroOPCIRepo.createQueryBuilder('reg')
      .select('MAX(reg.conteo)', 'max')
      .getRawOne();

    return maxi.max + 1;
  } //Fin

  //Insertar registros---------------------------------------------------------------------
  async insert(body: CreateRegistroOPCIDto) {
    try {
      //Procedencia
      const Procedencia = await this.Procedencia.findBy({
        id: In(body.procedencia),
      });
      if (Procedencia.length === 0)
        throw new NotFoundException(
          `Procedencias con id's ${body.procedencia} no encontrado`,
        );

      //Destino
      const Destino = await this.Destino.findBy({
        id: In(body.destino),
      });
      if (Destino.length === 0)
        throw new NotFoundException(
          `Destinos con id's ${body.destino} no encontrado`,
        );

      //Departamentos
      const Unidades = await this.UnidadesRepo.findBy({
        id: In(body.unidades),
      });
      if (Unidades.length === 0)
        throw new NotFoundException(
          `Unidades con id's ${Unidades} no encontrado`,
        );

      const insertRegistro = {
        ...body,
        procedencia: Procedencia,
        destino: Destino,
        unidades: Unidades,
      };

      const result = this.RegistroOPCIRepo.create(insertRegistro);

      await this.RegistroOPCIRepo.save(result);

      return {
        statusCode: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          error: MESSAGE_ERROR.CREATE,
          cause: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(id: string, body: UpdateRegistroOPCIDto) {
    try {
      const preloadBody = {
        id,
        ...body,
        unidades: await this.UnidadesRepo.findBy({
          id: In(body.unidades),
        }),
        procedencia: await this.Procedencia.findBy({
          id: In(body.procedencia),
        }),
        destino: await this.Destino.findBy({
          id: In(body.destino),
        }),
      };

      const result = await this.RegistroOPCIRepo.preload(preloadBody);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.RegistroOPCIRepo.save(result),
      };
    } catch (error) {
      throw new HttpException(
        {
          error: MESSAGE_ERROR.UPDATE,
          cause: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //Eliminar registros--------------------------------------------------------------------
  async remove(id: string) {
    try {
      const response = await this.RegistroOPCIRepo.findOne({ where: { id } });

      if (response) {
        return {
          statusCode: HttpStatus.OK,
          data: await this.RegistroOPCIRepo.remove(response),
        };
      } else throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        {
          error: MESSAGE_ERROR.DELETE,
          cause: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
