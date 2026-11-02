import Fastify from 'fastify';
import multipart from '@fastify/multipart';

import usersRoutes from './modules/users/users.routes.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
      files: 5,
    },
  });

  app.register(usersRoutes, {
    prefix: '/api/users',
  });

  return app;
}
