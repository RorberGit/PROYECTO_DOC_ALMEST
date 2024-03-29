import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AppDataSource } from 'src/data-source';
import { Avatar } from '../entities';

@Injectable()
export default class AvatarService {
  //constructor(
  // @InjectRepository(DatabaseFile)
  //private databaseFilesRepository: Repository<DatabaseFile>,
  // ) {}
  private avatarRepository = AppDataSource.getRepository(Avatar);

  async uploadDatabaseFileWithQueryRunner(
    dataBuffer: Buffer,
    filename: string,
    queryRunner: QueryRunner,
  ) {
    const newFile = await queryRunner.manager.create(Avatar, {
      filename,
      data: dataBuffer,
    });
    await queryRunner.manager.save(Avatar, newFile);
    return newFile;
  }

  async deleteFileWithQueryRunner(fileId: string, queryRunner: QueryRunner) {
    const deleteResponse = await queryRunner.manager.delete(Avatar, fileId);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.avatarRepository.create({
      filename,
      data: dataBuffer,
    });
    await this.avatarRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: string) {
    const file = await this.avatarRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
