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
  Departamentos,
  TrazasOPCI,
  TipoDocumento,
  ClasificacionDocumento,
  ProcedenciaEntity,
  DestinoEntity,
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
  @JoinColumn({ name: 'TipoDocumentoID' })
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
  public TipoDocumentoID?: string;

  //Relacion Clasificacion Documento
  @JoinColumn({ name: 'ClasificacionDocumentoID' })
  @ManyToOne(
    () => ClasificacionDocumento,
    (clasificacionDocumento) => clasificacionDocumento.idRegistroOPCI,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  public ClasificacionDocumento_relation: ClasificacionDocumento;

  @Column({ nullable: true })
  public ClasificacionDocumentoID?: string;

  //Relacion de Muchos a Muchos con Departamentos
  @ManyToMany(() => Departamentos)
  @JoinTable({
    name: 'opci_departamentos',
  })
  departamentos: Departamentos[];

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
