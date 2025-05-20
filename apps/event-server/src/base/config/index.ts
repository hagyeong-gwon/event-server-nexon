import { z } from 'zod';

export const configSchema = z.object({
  // NODE_ENV: z.enum(['dev', 'prod', 'test']).optional(),
  //
  APP_NAME: z.string().default('event-server'),
  // APP_VERSION: z.string().optional(),
  //
  PORT: z.coerce.number().int().positive().finite().optional(),
  MONGO_DB: z.string(),
  AUTH_SERVICE_URL: z.string().url(),
  AUTH_GRPC_URL: z.string(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
