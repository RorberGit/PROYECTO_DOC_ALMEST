import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';

import utf8 from 'utf8';

import 'dotenv/config';

@ApiTags('Files')
@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD, //'./uploads',
        filename: function (req, file, cb) {
          const n = Buffer.from(file.originalname, 'utf8').toString();

          cb(null, n); //utf8.decode(file.originalname));
        },
      }),
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|dot|xls|xlsx|jpg)$/)) {
          return cb(new Error('Formato de archivo invalido'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: `Archivo ${utf8.decode(file.originalname)} subido exitosamente`,
      data: file.originalname,
    };
  }

  ///----------------------------- dest: './uploads'
  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files[]', 10, {
      storage: diskStorage({
        destination: process.env.UPLOAD, //'./uploads',
        filename: function (req, file, cb) {
          cb(null, utf8.decode(file.originalname));
        },
      }),
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), process.env.UPLOAD + filename)));
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), process.env.UPLOAD + filename),
    );
    console.log('file', file);
    return new StreamableFile(file);
  }
}
