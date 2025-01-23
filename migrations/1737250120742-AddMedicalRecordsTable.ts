import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMedicalRecordsTable1737250120742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE medical_records (
        id BIGSERIAL PRIMARY KEY,
        note TEXT NOT NULL,
        created_at DATE NOT NULL,
        patient_id BIGINT REFERENCES patients(id) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE medical_records;
    `);
  }
}
