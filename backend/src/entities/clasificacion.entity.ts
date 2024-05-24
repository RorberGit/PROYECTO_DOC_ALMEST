import { Comun } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { RegistroOPCI } from './registroOPCI.entity';

@Entity('clasificacion')
export class Clasificacion extends Comun {
  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  public nombre: string;

  @OneToMany(
    () => RegistroOPCI,
    (registroOPCI) => registroOPCI.clasificacion_relation,
  )
  public idRegistroOPCI: RegistroOPCI[];
}
