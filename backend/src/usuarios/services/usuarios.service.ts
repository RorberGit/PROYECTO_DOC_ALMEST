import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Usuarios } from '../../entities';
import { CreateUsersDto } from '../dtos/create-usuarios.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';
import { MESSAGE_ERROR } from 'src/common/constantes.const';

@Injectable()
export class UsuariosService {
  private UsersRepository = AppDataSource.getRepository(Usuarios);

  async findAll() {
    const user = await this.UsersRepository.find({
      select: {
        id: true,
        user: true,
        fullname: true,
        dni: true,
        roles: true,
        email: true,
        unidad_relation: {
          id: true,
          nombre: true,
        },
        cargo_relation: {
          id: true,
          nombre: true,
        },
        especialidad_relation: {
          id: true,
          nombre: true,
        },
      },
      relations: {
        unidad_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
      },
      where: { user: Not('administrador') },
      order: { fullname: 'ASC' },
    });

    if (user.length) return user;
    else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    const user = await this.UsersRepository.findOne({
      where: { id },
      relations: {
        unidad_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
      },
    });

    if (user) return user;
    else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async findByUser(value: string) {
    const result = await this.UsersRepository.findOne({
      where: { user: value },
      relations: {
        unidad_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
      },
    });

    if (result) {
      return {
        statusCode: HttpStatus.OK,
        data: result,
      };
    } else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async findByUnit(value: string) {
    const response = await this.UsersRepository.find({
      where: { idunidad: value },
      relations: {
        unidad_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
      },
    });

    if (response) {
      return {
        statusCode: HttpStatus.OK,
        data: response,
      };
    } else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async insert(body: CreateUsersDto) {
    if (body.password) {
      const saltOrRounds = 12;
      body.password = await bcrypt.hash(body.password, saltOrRounds);
    }

    try {
      const user = this.UsersRepository.create(body);
      await this.UsersRepository.save(user);

      return {
        statusCode: HttpStatus.OK,
        data: user,
      };
    } catch (error) {
      throw new ForbiddenException({
        error: MESSAGE_ERROR.CREATE,
        cause: error,
      });
    }
  }

  async update(id: string, body: UpdateUsersDto) {
    if (body.password) {
      const saltOrRounds = 12;
      body.password = await bcrypt.hash(body.password, saltOrRounds);
    } else {
      delete body.password;
    }

    try {
      const preload = {
        id,
        ...body,
      };

      const user = await this.UsersRepository.preload(preload);

      if (user) {
        return {
          statusCode: HttpStatus.OK,
          data: await this.UsersRepository.save(user),
        };
      } else {
        throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
      }
    } catch (error) {
      throw new ForbiddenException({
        error: MESSAGE_ERROR.UPDATE,
        cause: error,
      });
    }
  }

  async delete(id: string) {
    const user = await this.UsersRepository.findOne({ where: { id } });

    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: await this.UsersRepository.remove(user),
      };
    }

    throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
  }
}
