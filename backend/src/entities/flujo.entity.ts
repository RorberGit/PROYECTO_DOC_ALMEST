import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Territorios, Unidades, Firmantes, TipoDocumento } from '.';
import { Comun } from 'src/common';

@Entity('flujo')
export class Flujo extends Comun {
  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  public nombre: string;

  @Column({ default: '' })
  public descripcion: string;

  //Atributo Tipo Documento
  @JoinColumn({ name: 'TipoDocumentoID' })
  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.idFlujo)
  public tipodocumento_relation: TipoDocumento;

  @Column({ nullable: true })
  public TipoDocumentoID?: string;

  @JoinColumn({ name: 'idUnidad' })
  @ManyToOne(() => Unidades, (unidades) => unidades.idFlujo)
  public unidad_relation: Unidades;

  @Column({ nullable: true })
  public idUnidad?: string;

  @JoinColumn({ name: 'idTerritorio' })
  @ManyToOne(() => Territorios, (territorios) => territorios.idFlujo)
  public territorio_relation: Territorios;

  @Column({ nullable: true })
  public idTerritorio?: string;

  @OneToMany(() => Firmantes, (firmantes) => firmantes.flujo_relation)
  public idFirmantes: Firmantes[];
}
