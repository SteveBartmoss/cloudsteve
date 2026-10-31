import Fastify from 'fastify';

import usersRoutes from './modules/users/users.routes';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
  });

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  app.register(usersRoutes, {
    prefix: '/api/users',
  });

  return app;
}
