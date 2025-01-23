import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @AutoMap()
  id: string;

  @Column({ name: 'email', type: 'varchar' })
  @AutoMap()
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: UserRole })
  @AutoMap()
  role: UserRole;
}
