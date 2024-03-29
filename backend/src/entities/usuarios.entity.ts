import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DeletedENUM, RolesENUM } from '../usuarios/enum/users.enum';
import {
  Areas,
  Cargos,
  Especialidades,
  RegistroDoc,
  Unidades,
  Avatar,
  Firmantes,
  Departamentos,
  TrazasOPCI,
} from '.';

import { Comun } from 'src/common';

@Entity('usuarios')
export class Usuarios extends Comun {
  @Column({ length: 25, default: '', unique: true })
  user: string;

  @Column({ length: 60, default: '' })
  fullname: string;

  @Column({ length: 60, default: '' })
  password: string;

  @Column({
    length: 11,
    default: '',
    comment: 'Número de documento de identidad',
  })
  dni: string;

  @Column({ default: '' })
  email: string;

  @Column({
    type: 'enum',
    enum: RolesENUM,
    default: RolesENUM.EJECUTOR,
  })
  roles: RolesENUM; //enum SI y NO

  @Column({
    type: 'enum',
    enum: DeletedENUM,
    default: DeletedENUM.NO,
  })
  deleted: DeletedENUM; //enum SI y NO

  @Column({ nullable: true })
  idarea: string;

  @ManyToOne(() => Areas, (area) => area.users)
  @JoinColumn({ name: 'idarea' })
  area_relation: Areas;

  @Column({ nullable: true })
  idcargo: string;

  @ManyToOne(() => Cargos, (cargo) => cargo.users)
  @JoinColumn({ name: 'idcargo' })
  cargo_relation: Cargos;

  @Column({ nullable: true })
  idespecialidad: string;

  @ManyToOne(() => Especialidades, (especialidad) => especialidad.users)
  @JoinColumn({ name: 'idespecialidad' })
  especialidad_relation: Especialidades; 

  @Column({ nullable: true })
  idunidad: string;

  @ManyToOne(() => Unidades, (unidad) => unidad.users)
  @JoinColumn({ name: 'idunidad' })
  unidad_relation: Unidades;

  @JoinColumn({ name: 'DepartamentoID' })
  @ManyToOne(() => Departamentos, (departamentos) => departamentos.UsuarioID)
  public departamento_relation: Departamentos;

  @Column({ nullable: true })
  DepartamentoID: string;

  @OneToMany(() => RegistroDoc, (registro) => registro.idUsuario)
  idRegistroDoc: RegistroDoc[];

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => Avatar, {
    nullable: true,
    cascade: ['update'],
    onDelete: 'CASCADE'
  })
  public avatar?: Avatar;

  @Column({ nullable: true })
  public avatarId?: string;

  @OneToMany(() => Firmantes, (firmantes) => firmantes.usuario_relation)
  idFirmantes: Firmantes[];

  @Column({ default: '' })
  refreshToken: string;

  @OneToMany(() => TrazasOPCI, (trazasOPCI) => trazasOPCI.usuario_relation)
  trazasOpciId: TrazasOPCI[];
}
