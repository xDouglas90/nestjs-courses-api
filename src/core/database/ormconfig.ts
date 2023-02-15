import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/../../**/**/*.entity{.ts,.js}',
    'dist/**/**/*.entity.js',
  ],
  migrations: [
    __dirname + './migrations/*{.ts,.js}',
    'dist/core/database/migrations/*{.ts,.js}',
  ],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'history',
});
