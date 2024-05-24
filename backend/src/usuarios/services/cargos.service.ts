import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Cargos } from '../../entities/cargos.entity';
import { CreateCargosDto } from '../dtos/create-cargos.dto';
import { UpdateCargosDto } from '../dtos/update-cargos.dto';

@Injectable()
export class CargosService {
  private CargosRepository = AppDataSource.getRepository(Cargos);

  async findAll() {
    const cargo = await this.CargosRepository.find({
      order: { nombre: 'ASC' },
    });

    if (cargo.length) return cargo;
    else {
      throw new HttpException(
        'Sin registros que mostrar',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    const cargo = await this.CargosRepository.findOne({
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

  async insert(body: CreateCargosDto) {
    let cargo = {};
    try {
      cargo = this.CargosRepository.create(body);
      await this.CargosRepository.save(cargo);
    } catch (error) {
      return error;
      console.log('Error desde el servicio', error);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cargo,
    };
  }

  async update(id: string, body: UpdateCargosDto) {
    const preloadCargo = {
      id,
      ...body,
    };

    const cargo = await this.CargosRepository.preload(preloadCargo);

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.CargosRepository.save(cargo),
      };
    } else {
      throw new HttpException(
        `No se encuentra el registro con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: string) {
    const cargo = await this.CargosRepository.findOne({ where: { id } });

    if (cargo) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.CargosRepository.remove(cargo),
      };
    }

    throw new HttpException(
      `No se encuentra el área con id ${id}`,
      HttpStatus.NOT_FOUND,
    );

    /*
    const result = await this.CargosRepository.delete(id);    

    if (result.affected === 0){
      throw new HttpException(
        `No se encuentra el área con id ${id}`,
        HttpStatus.NOT_FOUND,
      );
      }
      */
  }
}
