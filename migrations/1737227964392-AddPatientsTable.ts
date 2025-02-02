import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPatientsTable1737227964392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE patients (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        date_of_birth DATE NOT NULL,
        phone_number VARCHAR(20) UNIQUE NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE patients;
    `);
  }
}
