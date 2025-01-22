import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @AutoMap()
  id: string;

  @Column({ name: 'action', type: 'varchar' })
  @AutoMap()
  action: string;

  @Column({ name: 'user_id', type: 'bigint' })
  @AutoMap()
  userId: string;

  @Column({ name: 'payload', type: 'json' })
  @AutoMap()
  payload: object;

  @Column({ name: 'created_at', type: 'date' })
  @AutoMap()
  createdAt: Date;
}
