import * as dotenv from 'dotenv';
import * as path from 'path';
import * as dotenvExpand from 'dotenv-expand';
import { mongo } from 'mongoose';

// Cargar el archivo .env desde la raíz del proyecto
const config = dotenv.config({
  path: path.resolve(__dirname, '../..', '.env'), // Ajusta según tu estructura
});
dotenvExpand.expand(config);

// Exportar las variables tipadas
export const ctisEnv = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3002,
  usersPort: process.env.USERS_TCP_PORT
    ? parseInt(process.env.USERS_TCP_PORT, 10)
    : 3003,
  usersHost: process.env.USERS_HOST || '127.0.0.1',
  mongoHost: process.env.MONGO_HOST || '127.0.0.1',
  mongoPort: process.env.MONGO_PORT
    ? parseInt(process.env.MONGO_PORT, 10)
    : 27017,
  mongoUser: process.env.MONGO_USER || 'root',
  mongoPass: process.env.MONGO_PASS || 'example',
  mongoDatabase: process.env.MONGO_DB || 'cti_management',
  timelinessWeight: process.env.TIMELINESS_WEIGHT
    ? parseInt(process.env.TIMELINESS_WEIGHT, 10)
    : 0.2,
  consistencyWeight: process.env.CONSISTENCY_WEIGHT
    ? parseInt(process.env.CONSISTENCY_WEIGHT, 10)
    : 0.4,
  interoperabilityWeight: process.env.INTEROPERABILITY_WEIGHT
    ? parseInt(process.env.INTEROPERABILITY_WEIGHT, 10)
    : 0.1,
  completenessWeight: process.env.COMPLETENESS_WEIGHT
    ? parseInt(process.env.COMPLETENESS_WEIGHT, 10)
    : 0.15,
  verifiabilityWeight: process.env.VERIFIABILITY_WEIGHT
    ? parseInt(process.env.VERIFIABILITY_WEIGHT, 10)
    : 0.15,
};
