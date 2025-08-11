import 'dotenv/config';
import * as env from 'env-var'; 

export const envs = {
  PORT: env.get('PORT').default('3000').asPortNumber(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  EMAIL: env.get('EMAIL').required().asEmailString(),
  EMAIL_SECRET_KEY: env.get('EMAIL_SECRET_KEY').required().asString(),
  PROD: env.get('PROD').required().asBool(),

  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString()
};