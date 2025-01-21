import { AutoMap } from '@automapper/classes';
import { Patient } from 'src/patients/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @AutoMap()
  id: string;

  @Column({ name: 'note', type: 'text' })
  @AutoMap()
  note: string;

  @Column({ name: 'created_at', type: 'date' })
  @AutoMap()
  createdAt: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id', referencedColumnName: 'id' })
  patient: Patient;
}
