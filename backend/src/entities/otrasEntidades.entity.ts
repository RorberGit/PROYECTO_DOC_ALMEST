import {
  Column,
  CreateDateColumn,
  Entity,  
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('otrasEntidades')
export class OtrasEntidades {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar', length: 60, default: '', unique: true })
  nombre: string;  

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
