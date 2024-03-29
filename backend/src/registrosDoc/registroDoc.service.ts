import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { RegistroDoc, Unidades, Usuarios } from '../entities';
import { CreateRegistroDocDto, UpdateRegistroDocDto } from './dto';
import { In } from 'typeorm';


@Injectable()
export class RegistroDocService {
  private RegistroDocRepo = AppDataSource.getRepository(RegistroDoc);
  private UsuariosRepo = AppDataSource.getRepository(Usuarios);
  private UnidadesRepo = AppDataSource.getRepository(Unidades);

  //Obtener todos los registros------------------------------------------------------------
  async findAll() {
    const result = await this.RegistroDocRepo.find({
      relations: {
        unidad_relation: true,
        idUsuario: true,
        tipodocumento_relation: true,
        destino: true,
      },
      order: {
        conteo: 'DESC',
      },
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

  //Obtener todos los registros de una unidad----------------------------------------------
  async findAllUnidadId(id: string) {
    const result = await this.RegistroDocRepo.find({
      relations: {
        unidad_relation: true,
        idUsuario: true,
        tipodocumento_relation: true,
        destino: true,
      },
      where: { unidad_relation: { id: id } },
      order: {
        codigo: 'DESC',
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

  //Buscar un único registro en la tabla por el campo Co_reg-------------------------------
  async findOne(id: string) {
    const result = await this.RegistroDocRepo.findOne({
      where: { id },
      relations: {
        unidad_relation: true,
        idUsuario: true,
        tipodocumento_relation: true,
        destino: true,
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

  //Buscar todos los registros que cumplan con el criterio
  async findAllReg(
    TipoDocumentoID: string,
    idUnidad: string,
    idTerritorio: string,
    estado: string,
  ) {
    const result = await this.RegistroDocRepo.find({
      relations: {
        unidad_relation: true,
        tipodocumento_relation: true,
        destino: true,
        idUsuario: true,
      },
      where: {
        estado: estado,
        tipodocumento_relation: { id: TipoDocumentoID },
        unidad_relation: {
          id: idUnidad,
          idTerritorio: idTerritorio,
        },
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

  //Función para Obtener el consecutivo del REGA--------------------------------------------
  async consecutivo(unidad: Unidades, year: string) {
    const maxi = await this.RegistroDocRepo.createQueryBuilder('reg')
      .select('MAX(reg.conteo)', 'max')
      .where('reg.idUnidad = :unidad', { unidad })
      .andWhere('reg.year = :year', { year })
      .getRawOne();

    return maxi.max + 1;
  } //Fin

  //Insertar registros---------------------------------------------------------------------
  async insert(body: CreateRegistroDocDto) {
    let result = {};
    console.log(body);
    try {
      const newregistro = new RegistroDoc();
      newregistro.conteo = body.conteo;
      newregistro.codigo = body.codigo;
      newregistro.fecha = body.fecha;
      newregistro.year = body.year;
      newregistro.descripcion = body.descripcion;
      newregistro.file = body.file;

      /* const unidad = await this.UnidadesRepo.findOne({
        where: { id: String(body.idUnidad) },
      });*/
      newregistro.idUnidad = String(body.idUnidad);

      const usuario = await this.UsuariosRepo.findOne({
        where: { id: String(body.idUsuario) },
      });
      newregistro.idUsuario = usuario;

      newregistro.TipoDocumentoID = body.TipoDocumentoID;

      const dest = await this.UnidadesRepo.findBy({ id: In(body.destino) });
      newregistro.destino = dest;

      newregistro.estado = body.estado;

      newregistro.ordenf = body.ordenf;

      console.log(newregistro);
      //clasif.id = String(body.idClasificacion)
      //newregistro.idUnidad = body.idUnidad;

      result = this.RegistroDocRepo.create(newregistro);
      await this.RegistroDocRepo.save(result);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: result,
    };
  }

  //Actualizar registros-------------------------------------------------------------------
  async update(id: string, body: UpdateRegistroDocDto) {
    const preloadBody = {
      id,
      ...body,
    };

    const result = await this.RegistroDocRepo.preload(preloadBody);

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.RegistroDocRepo.save(result),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //Eliminar registros--------------------------------------------------------------------
  async remove(id: string) {
    const result = await this.RegistroDocRepo.findOne({ where: { id } });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.RegistroDocRepo.remove(result),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
