import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Comun } from 'src/common';
import {
  TrazasOPCI,
  TipoDocumento,
  ProcedenciaEntity,
  DestinoEntity,
  Unidades,
  Clasificacion,
} from '.';

@Entity('opci')
export class RegistroOPCI extends Comun {
  @Column({ type: 'int', width: 10, nullable: true })
  conteo: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
    nullable: true,
  })
  codigo: string;

  @Column({ type: 'date', nullable: true })
  fecha: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  descripcion: string;

  @Column({ type: 'text', default: '', nullable: true })
  nota: string;

  @Column('simple-array', { nullable: true })
  file: string[];

  @Column({ type: 'varchar', length: 30, nullable: true })
  estado: string;

  //Relacion Tipo documento
  @JoinColumn({ name: 'idTipoDocumento' })
  @ManyToOne(
    () => TipoDocumento,
    (tipoDocumento) => tipoDocumento.idRegistroOPCI,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  public tipodocumento_relation: TipoDocumento;

  @Column({ nullable: true })
  public idTipoDocumento?: string;

  //Relacion Clasificacion Documento
  @JoinColumn({ name: 'idClasificacion' })
  @ManyToOne(
    () => Clasificacion,
    (clasificacion) => clasificacion.idRegistroOPCI,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  public clasificacion_relation: Clasificacion;

  @Column({ nullable: true })
  public idClasificacion?: string;

  //Relacion de Muchos a Muchos con Departamentos
  @ManyToMany(() => Unidades)
  @JoinTable({
    name: 'opci_departamentos_unidades',
  })
  unidades: Unidades[];

  //Relacion de Muchos a Muchos con Procedencia
  @ManyToMany(() => ProcedenciaEntity, { cascade: true })
  @JoinTable({
    name: 'opci_procedencia',
  })
  procedencia: ProcedenciaEntity[];

  //Relacion de Muchos a Muchos con Destinos
  @ManyToMany(() => DestinoEntity, { cascade: true })
  @JoinTable({
    name: 'opci_destino',
  })
  destino: DestinoEntity[];

  //Relacion con las trazas
  @OneToMany(() => TrazasOPCI, (trazasOPCI) => trazasOPCI.opci_relation)
  trazasOpciId: TrazasOPCI[];
}
