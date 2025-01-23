import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @AutoMap()
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  @AutoMap()
  name: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  @AutoMap()
  dateOfBirth: Date;

  @Column({ name: 'phone_number', type: 'varchar' })
  @AutoMap()
  phoneNumber: string;
}
