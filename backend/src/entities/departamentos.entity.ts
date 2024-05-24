import { Column, Entity, OneToMany } from 'typeorm';

import { Comun } from 'src/common';
import { Usuarios } from './usuarios.entity';

@Entity('departamentos')
export class Departamentos extends Comun {
  @Column({ type: 'varchar', length: 120, nullable: true })
  public nombre: string;
}
