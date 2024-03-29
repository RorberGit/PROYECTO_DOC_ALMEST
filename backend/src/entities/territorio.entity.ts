import { Column, Entity, OneToMany } from 'typeorm';

import { Unidades, Flujo } from '.';
import { Comun } from 'src/common';

@Entity('territorios')
export class Territorios extends Comun {
  @Column({ length: 200, default: '' })
  nombre: string;

  @Column({ default: '', nullable: true })
  descripcion: string;

  @OneToMany(() => Unidades, (unidades) => unidades.idTerritorio)
  idUnidad: Unidades[];

  @OneToMany(() => Flujo, (flujo) => flujo.territorio_relation)
  idFlujo: Flujo[];
}
