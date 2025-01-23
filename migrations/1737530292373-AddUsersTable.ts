import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1737530292373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE user_role AS ENUM (
        'admin',
        'provider'
      );

      CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        role user_role NOT NULL DEFAULT 'provider'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users;
      DROP TYPE user_role;
    `);
  }
}
