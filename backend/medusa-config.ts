import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const REDIS_URL = process.env.REDIS_URL

// In production (Railway) Redis backs the cache, event bus, workflow engine and locking. Locally, without
// REDIS_URL, Medusa falls back to its in-memory modules.
const redisModules = REDIS_URL
  ? [
      { key: Modules.CACHE, resolve: '@medusajs/medusa/cache-redis', options: { redisUrl: REDIS_URL } },
      { key: Modules.EVENT_BUS, resolve: '@medusajs/medusa/event-bus-redis', options: { redisUrl: REDIS_URL } },
      { key: Modules.WORKFLOW_ENGINE, resolve: '@medusajs/medusa/workflow-engine-redis', options: { redis: { url: REDIS_URL } } },
      {
        key: Modules.LOCKING,
        resolve: '@medusajs/medusa/locking',
        options: { providers: [{ resolve: '@medusajs/medusa/locking-redis', id: 'locking-redis', is_default: true, options: { redisUrl: REDIS_URL } }] },
      },
    ]
  : []

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: REDIS_URL,
    workerMode: (process.env.MEDUSA_WORKER_MODE as 'shared' | 'worker' | 'server') || 'shared',
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:3000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:3000,http://localhost:9000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  modules: redisModules,
})
