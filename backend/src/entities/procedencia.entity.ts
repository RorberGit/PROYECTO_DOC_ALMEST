import { Comun } from "src/common";
import { Column, Entity } from "typeorm";

@Entity('procedencia')
export class ProcedenciaEntity extends Comun {
  @Column({ type: 'varchar', length: 120 })
  public nombre: string;
}
