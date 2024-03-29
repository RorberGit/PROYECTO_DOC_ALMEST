import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';

export const JwtConsts = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

export const MENSSAGES = {
  MESSAGE_OK: 'OK',
  MESSAGE_NOT_FOUND: 'Sin registros que mostrar',
  OK_STATUS: HttpStatus.OK,
  NOT_FOUND_STATUS: HttpStatus.NOT_FOUND,
  CREATED_STATUS: HttpStatus.CREATED,
  INTERNAL_SERVER_ERROR_STATUS: HttpStatus.INTERNAL_SERVER_ERROR,
};
