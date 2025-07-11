import * as dotenv from 'dotenv';
import * as path from 'path';

const config = dotenv.config({
  path: path.resolve(__dirname, '.env'), // Ajusta según tu estructura
});

// Exportar las variables tipadas
export const orgsEnv = {
  host: process.env.HOST || '0.0.0.0',
  restPort: process.env.REST_PORT ? parseInt(process.env.REST_PORT, 10) : 3001,
  tcpPort: process.env.TCP_PORT ? parseInt(process.env.TCP_PORT, 10) : 3003,
  postgresHost: process.env.POSTGRES_HOST || 'ctishield-postgres',
  postgresPort: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  postgresUser: process.env.POSTGRES_USERNAME || 'root',
  postgresPass: process.env.POSTGRES_PASSWORD || 'root',
  postgresDatabase: process.env.POSTGRES_DATABASE || 'test',
};
