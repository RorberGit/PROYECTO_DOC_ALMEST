import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags("validación de Usuarios")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async validateUser(@Body() authDto: AuthDto) {
    const resul = await this.authService.validateUser(authDto);
    console.info('Resultado', resul);
    return resul; //await this.authService.validateUser(authDto);
  }

  
}
