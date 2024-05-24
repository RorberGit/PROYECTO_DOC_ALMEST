import { RegistroDoc, Territorios, Usuarios, Flujo, TrazasOPCI } from '.';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comun } from 'src/common';

//Unidades o Departamentos
@Entity('unidades')
export class Unidades extends Comun {
  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  nombre: string; //unidades: string;

  @Column({ type: 'varchar', length: 4, default: '', unique: true })
  key: string;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idunidad)
  users: Usuarios[];

  @OneToMany(() => RegistroDoc, (registroDoc) => registroDoc.idUnidad)
  idRegistroDoc: RegistroDoc[];

  @JoinColumn({ name: 'idTerritorio' })
  @ManyToOne(() => Territorios, (territorios) => territorios.idUnidad, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  territorio_relation: Territorios;

  @Column({ nullable: true })
  idTerritorio: string;

  @OneToMany(() => Flujo, (flujo) => flujo.unidad_relation)
  idFlujo: Flujo[];

  @OneToMany(() => TrazasOPCI, (trazasOPCI) => trazasOPCI.unidad_relation)
  trazasOpciId: TrazasOPCI[];
}
