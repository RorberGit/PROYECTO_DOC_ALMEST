import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { ClasificacionDocumento } from '../entities/clasificacion_documento.entity';
import {
  CreateClasificacionDocumentoDto,
  UpdateClasificacionDocumentoDto,
} from './dto';

@Injectable()
export class ClasificacionDocumentoService {
  private ClasificacionDocumentoRepository = AppDataSource.getRepository(
    ClasificacionDocumento,
  );

  async findAll() {
    const result = await this.ClasificacionDocumentoRepository.find({
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
    const cargo = await this.ClasificacionDocumentoRepository.findOne({
      where: { id },
    });

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: cargo,
      };
    } else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async insert(body: CreateClasificacionDocumentoDto) {
    let cargo = {};

    try {
      cargo = this.ClasificacionDocumentoRepository.create(body);
      await this.ClasificacionDocumentoRepository.save(cargo);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cargo,
    };
  }

  async update(id: string, body: UpdateClasificacionDocumentoDto) {
    const preloadCargo = {
      id,
      ...body,
    };

    const cargo = await this.ClasificacionDocumentoRepository.preload(
      preloadCargo,
    );

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.ClasificacionDocumentoRepository.save(cargo),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const cargo = await this.ClasificacionDocumentoRepository.findOne({
      where: { id },
    });

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.ClasificacionDocumentoRepository.remove(cargo),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.ClasificacionDocumentoRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
