import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Usuarios } from '../entities';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';
import { AvatarService } from 'src/avatar';
import { Not } from 'typeorm';
import { MESSAGE_ERROR } from 'src/common/constantes.const';

@Injectable()
export class UsuariosService {
  constructor(private readonly avatarService: AvatarService) { }

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
        area_relation: {
          id: true,
          nombre: true
        },
        cargo_relation:{
          id: true,
          nombre: true
        },
        especialidad_relation: {
          id:true,
          nombre: true
        }
      },
      relations: {
        unidad_relation: true,
        area_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
        idFirmantes: true,
      },
      where: { user: Not('administrador') },
      order: { fullname: 'ASC' },
    });

    console.log("usuario :>", user)

    if (user.length) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: user,
      };
    } else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    const user = await this.UsersRepository.findOne({
      where: { id },
      relations: {
        unidad_relation: true,
        area_relation: true,
        cargo_relation: true,
        especialidad_relation: true,
      },
    });

    if (user) {
      return {
        statusCode: HttpStatus.OK,
        data: user,
      };
    } else {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND);
    }
  }

  async findByUser(value: string) {
    const result = await this.UsersRepository.findOne({
      where: { user: value },
      relations: {
        unidad_relation: true,
        area_relation: true,
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
        area_relation: true,
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

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    //const queryRunner = this.connection.createQueryRunner();
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(Usuarios, {
        where: { id: userId },
      });

      const currentAvatarId = user.avatarId;

      const avatar = await this.avatarService.uploadDatabaseFileWithQueryRunner(
        imageBuffer,
        filename,
        queryRunner,
      );

      await queryRunner.manager.update(Usuarios, userId, {
        avatarId: avatar.id,
      });

      if (currentAvatarId) {
        await this.avatarService.deleteFileWithQueryRunner(
          currentAvatarId,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return avatar;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
