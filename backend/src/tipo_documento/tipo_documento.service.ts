import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { TipoDocumento } from '../entities/tipo_documento.entity';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';

@Injectable()
export class TipoDocumentoService {
  private TipoDocumentoRepository = AppDataSource.getRepository(TipoDocumento);

  async findAll() {
    const result = await this.TipoDocumentoRepository.find({
      order: { nombre: 'ASC' },
    });

    if (result.length) return result;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    const cargo = await this.TipoDocumentoRepository.findOne({
      where: { id },
    });

    if (cargo) return cargo;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async insert(body: CreateTipoDocumentoDto) {
    let cargo = {};

    try {
      cargo = this.TipoDocumentoRepository.create(body);
      await this.TipoDocumentoRepository.save(cargo);
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cargo,
    };
  }

  async update(id: string, body: UpdateTipoDocumentoDto) {
    const preloadCargo = {
      id,
      ...body,
    };

    const cargo = await this.TipoDocumentoRepository.preload(preloadCargo);

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.TipoDocumentoRepository.save(cargo),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const cargo = await this.TipoDocumentoRepository.findOne({
      where: { id },
    });

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.TipoDocumentoRepository.remove(cargo),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.TipoDocumentoRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
