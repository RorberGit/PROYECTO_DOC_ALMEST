import { Comun } from "src/common";
import { Column, Entity } from "typeorm";

@Entity('destino')
export class DestinoEntity extends Comun {
  @Column({ type: 'varchar', length: 120 })
  public nombre: string;
}
