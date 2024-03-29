import { Comun } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('estados')
export class Estados extends Comun {
  @Column({ default: '' })
  nombre: string;
}
