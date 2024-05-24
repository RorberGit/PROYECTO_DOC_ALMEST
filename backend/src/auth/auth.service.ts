import { Injectable, HttpStatus } from '@nestjs/common';

import { AuthDto } from './dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';
import { UsuariosService } from 'src/usuarios/services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userService.findByUser(authDto.usuario);

    //Si el usuario no existe
    if (!user.data) {
      return user;
      //throw new NotFoundException('Usuario no encontrado');
    }

    //Validar contraseña
    const valid = await bcrypt.compare(authDto.password, user.data.password);

    //si la contraseña es incorrecta
    if (!valid) {
      return {
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Constraseña Incorrecta',
        data: valid,
      };
    }

    const token = this.generateAccessToken(user.data.id, user.data.fullname);

    //eliminar la contraseña
    delete user.data.password;

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario Logueado',
      data: { ...user.data, ...token },
    };
  }

  generateAccessToken(idUsuario: string, usuario: string) {
    const payload: JWTPayload = { idUsuario: idUsuario, usuario: usuario };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
