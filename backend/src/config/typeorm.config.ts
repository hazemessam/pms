import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();

const baseDataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: parseInt(configService.getOrThrow<string>('DB_PORT')),
  database: configService.getOrThrow<string>('DB_NAME'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
};

export const typeOrmModuleConfig: TypeOrmModuleOptions = {
  ...baseDataSourceConfig,
  autoLoadEntities: true,
};

const migrationDataSourceConfig: DataSourceOptions = {
  ...baseDataSourceConfig,
  migrations: ['migrations/**'],
};

export default new DataSource(migrationDataSourceConfig);
