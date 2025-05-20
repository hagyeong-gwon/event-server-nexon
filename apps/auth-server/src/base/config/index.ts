import { z } from 'zod';

export const configSchema = z.object({
  APP_NAME: z.string().default('auth-server'),

  PORT: z.coerce.number().int().positive().finite().optional(),
  GRPC_PORT: z.coerce.number().int().positive().finite().optional(),
  MONGO_DB: z.string(),
  JWT_SECRET: z.string(),
  HASH_NUM: z.coerce.number().int().positive().finite(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
