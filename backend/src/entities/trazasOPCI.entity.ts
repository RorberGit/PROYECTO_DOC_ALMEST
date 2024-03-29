import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Comun } from 'src/common';
import { RegistroOPCI, Unidades, Usuarios } from '.';

@Entity('opci_trazas')
export class TrazasOPCI extends Comun {
  @Column({ type: 'varchar', length: 30, nullable: true })
  estado: string;

  //Relacion con Registros OPCI
  @JoinColumn({ name: 'registrosOpciId' })
  @ManyToOne(() => RegistroOPCI, (registroOPCI) => registroOPCI.trazasOpciId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  opci_relation: RegistroOPCI;

  @Column({ nullable: true })
  registrosOpciId: string;

  //Ralacion con Unidad
  @JoinColumn({ name: 'UnidadId' })
  @ManyToOne(() => Unidades, (unidades) => unidades.trazasOpciId, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  unidad_relation: Unidades;

  @Column({ nullable: true })
  UnidadId: string;

  //Relacion con Usuarios
  @JoinColumn({ name: 'UsuarioId' })
  @ManyToOne(() => Usuarios, (usuario) => usuario.trazasOpciId, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  usuario_relation: Usuarios;

  @Column({ nullable: true })
  UsuarioId: string;
}
