import { Comun } from 'src/common';
import { RegistroOPCI, Flujo, RegistroDoc } from '.';

import { Column, Entity, OneToMany } from 'typeorm';

@Entity('tipo_documento')
export class TipoDocumento extends Comun {
  @Column({ type: 'varchar', length: 4, default: '', unique: true })
  public key: string;

  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  public nombre: string;

  @OneToMany(
    () => RegistroDoc,
    (registroDoc) => registroDoc.tipodocumento_relation,
  )
  public idRegistroDoc: RegistroDoc[];

  @OneToMany(() => Flujo, (flujo) => flujo.tipodocumento_relation)
  public idFlujo: Flujo[];

  @OneToMany(
    () => RegistroOPCI,
    (registroOPCI) => registroOPCI.tipodocumento_relation,
  )
  public idRegistroOPCI: RegistroOPCI[];
}
