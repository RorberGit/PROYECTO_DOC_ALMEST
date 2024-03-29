import { Comun } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('avatar')
export class Avatar extends Comun {
  @Column()
  public filename: string;

  @Column({
    type: 'bytea',
  })
  public data: Uint8Array;
}
