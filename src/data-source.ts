import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: getEnvVariable('DB_HOST'),
  port: parseInt(getEnvVariable('DB_PORT'), 10),
  username: getEnvVariable('DB_USERNAME'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Siempre en falso en producción
  logging: true,
});
