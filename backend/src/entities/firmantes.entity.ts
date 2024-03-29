import { Comun } from 'src/common';
import { Usuarios } from '.';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Flujo } from './flujo.entity';
import { Aprobaciones } from './aprobaciones.entity';

@Entity('firmantes')
export class Firmantes extends Comun {
  @JoinColumn({ name: 'idUsuario' })
  @ManyToOne(() => Usuarios, (usuario) => usuario.idFirmantes)
  public usuario_relation: Usuarios;

  @Column({ nullable: true })
  public idUsuario?: string;

  @JoinColumn({ name: 'idFlujo' })
  @ManyToOne(() => Flujo, (flujo) => flujo.idFirmantes)
  public flujo_relation: Flujo;

  @Column({ nullable: true })
  public idFlujo?: string;

  @OneToMany(
    () => Aprobaciones,
    (aprobaciones) => aprobaciones.firmantes_relation,
  )
  idAprobaciones: Aprobaciones[];

  @Column({ nullable: true })
  public orden?: number;
}
