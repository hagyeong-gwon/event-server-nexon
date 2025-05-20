import { z } from 'zod';

export const configSchema = z.object({
  APP_NAME: z.string().default('gateway-server'),

  PORT: z.coerce.number().int().positive().finite().optional(),
  AUTH_SERVICE_URL: z.string().url(),
  EVENT_SERVICE_URL: z.string().url(),
  AUTH_GRPC_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
