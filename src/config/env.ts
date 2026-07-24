import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  COMPANY_NAME: z.string().default('All Solutions SpA'),
  COMPANY_RUT: z.string().default('77.654.321-K'),
  GMAIL_ACCOUNT: z.string().default('ventascotizawasap@gmail.com'),
  GMAIL_APP_PASSWORD: z.string().default('All_Solutions_77654321K'),
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.string().default('3306').transform((val) => parseInt(val, 10)),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().default('gestion_cotizaciones_db'),
  GEMINI_API_KEY: z.string().optional().default(''),
  WHATSAPP_TOKEN: z.string().optional().default(''),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(''),
  WEBHOOK_VERIFY_TOKEN: z.string().default('allsolutions_verify_token_2026'),
});

export const env = envSchema.parse(process.env);
