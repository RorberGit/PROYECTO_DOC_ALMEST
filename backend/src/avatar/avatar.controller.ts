import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  StreamableFile,
  Res,
} from '@nestjs/common';
import DatabaseFilesService from './avatar.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Avatar')
@Controller('avatar')
@UseInterceptors(ClassSerializerInterceptor)
export default class AvatarController {
  constructor(private readonly databaseFilesService: DatabaseFilesService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.databaseFilesService.getFileById(id);

    const stream = Readable.from(file.data);

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }
}
