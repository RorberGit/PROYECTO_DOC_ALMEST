import { Module } from '@nestjs/common';
import { DestinoModule } from './destino/destino.module';
import { ProcedenciaModule } from './procedencia/procedencia.module';

import { ConfigModule } from '@nestjs/config';
import { AreasModule } from './areas';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar';
import { CargosModule } from './cargos';
import { ClasificacionDocumentoModule } from './clasificacion_documento';
import { EspecialidadesModule } from './especialidades';
import { DepartamentosModule, RegistroOPCIModule } from './opci/modules';
import { TrazasOPCIModule } from './opci/modules/trazasOPCI.module';
import { OtrasEntidadesModule } from './otrasEntidades';
import {
  AprobacionesModule,
  FirmantesModule,
  FlujoModule,
} from './procesos/modules';
import { registroDocModule } from './registrosDoc';
import { TipoDocumentoModule } from './tipo_documento';
import { UnidadesModule } from './unidades';
import { UploadModule } from './upload/upload.module';
import { UsuariosModule } from './usuarios';

@Module({
  imports: [
    DestinoModule,
    ProcedenciaModule,
    AuthModule,
    UsuariosModule,
    UnidadesModule,
    AreasModule,
    CargosModule,
    EspecialidadesModule,
    TipoDocumentoModule,
    OtrasEntidadesModule,
    registroDocModule,
    FirmantesModule,
    AprobacionesModule,
    AvatarModule,
    UploadModule,
    FlujoModule,
    RegistroOPCIModule,
    TrazasOPCIModule,
    DepartamentosModule,
    ClasificacionDocumentoModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
