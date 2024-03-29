import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comun } from 'src/common';
import { Firmantes } from './firmantes.entity';
import { RegistroDoc } from '.';

@Entity('aprobaciones')
export class Aprobaciones extends Comun {
  @Column({ default: '' })
  public estado: string;

  @Column({ default: '', nullable: true })
  public observaciones: string;

  @JoinColumn({ name: 'idFirmantes' })
  @ManyToOne(() => Firmantes, (firmantes) => firmantes.idAprobaciones, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  public firmantes_relation: Firmantes;

  @Column({ nullable: true })
  public idFirmantes?: string;

  @JoinColumn({ name: 'idRegistroDoc' })
  @ManyToOne(() => RegistroDoc, (registroDoc) => registroDoc.idAprobaciones, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  public registrodoc_relation: RegistroDoc;

  @Column({ nullable: true })
  public idRegistroDoc?: string;
}
