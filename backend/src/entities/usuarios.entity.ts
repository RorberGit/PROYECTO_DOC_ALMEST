import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DeletedENUM } from '../usuarios/enum/users.enum';
import {
  Cargos,
  Especialidades,
  RegistroDoc,
  Unidades,
  Firmantes,
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
    length: 30,
    default: '',
    nullable: true,
  })
  roles: string; //enum SI y NO

  @Column({
    type: 'enum',
    enum: DeletedENUM,
    default: DeletedENUM.NO,
  })
  deleted: DeletedENUM; //enum SI y NO

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

  @OneToMany(() => RegistroDoc, (registro) => registro.idUsuario)
  public idRegistroDoc?: RegistroDoc[];

  @OneToMany(() => Firmantes, (firmantes) => firmantes.usuario_relation)
  idFirmantes?: Firmantes[];

  @Column({ default: '' })
  refreshToken: string;

  @OneToMany(() => TrazasOPCI, (trazasOPCI) => trazasOPCI.usuario_relation)
  trazasOpciId: TrazasOPCI[];

  @Column({ type: 'text', nullable: true, default: '' })
  public foto?: string;
}
