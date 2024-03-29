import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Unidades, Usuarios, Aprobaciones, TipoDocumento } from '.';

import { Comun } from 'src/common';
/*
@Unique('co_reg_nr', [
  'Num_unidad_reg',
  'num_reg',
  'ent_sal',
  'year',
  'Co_pdest',
  'repartir',
])
*/
@Entity('register')
export class RegistroDoc extends Comun {
  @Column({ type: 'int', width: 10, nullable: true })
  conteo: number;

  @Column({ type: 'varchar', length: 20, default: '', nullable: true })
  codigo: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  descripcion: string;

  @JoinColumn({ name: 'idUnidad' })
  @ManyToOne(() => Unidades, (unidades) => unidades.idRegistroDoc, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  unidad_relation: Unidades;

  @Column({ nullable: true })
  idUnidad: string;

  @JoinColumn({ name: 'idUsuario' })
  @ManyToOne(() => Usuarios, (usuario) => usuario.idRegistroDoc, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  idUsuario: Usuarios;

  //Atributo Tipo de Documento
  @JoinColumn({ name: 'TipoDocumentoID' })
  @ManyToOne(
    () => TipoDocumento,
    (tipoDocumento) => tipoDocumento.idRegistroDoc,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  tipodocumento_relation: TipoDocumento;

  @Column({ nullable: true })
  TipoDocumentoID: string;

  @ManyToMany(() => Unidades)
  @JoinTable()
  destino: Unidades[];

  @Column({ type: 'varchar', length: 200, default: '', nullable: true })
  file: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  estado: string;

  @OneToMany(
    () => Aprobaciones,
    (aprobaciones) => aprobaciones.registrodoc_relation,
  )
  idAprobaciones: Aprobaciones[];

  @Column({ type: 'int', width: 4, nullable: true })
  ordenf: number;
}
