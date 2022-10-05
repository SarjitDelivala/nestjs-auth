import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: 'app',
  database: 'app',
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
  logging: true,
  logger: "file",
};