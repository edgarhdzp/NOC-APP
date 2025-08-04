import 'dotenv/config';
import * as env from 'env-var'; 

export const envs = {
  port: env.get('PORT').default('3000').asPortNumber(),
  email: env.get('EMAIL').required().asEmailString(),
  emailPassword: env.get('EMAIL_PASSWORD').required().asString(),
};