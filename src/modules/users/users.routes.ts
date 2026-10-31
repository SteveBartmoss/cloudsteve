import type { FastifyPluginAsync } from 'fastify';

const usersRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return {
      data: [],
      message: 'Users retrieved successfully',
    };
  });

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    return reply.send({
      id,
      message: 'User retrieved successfully',
    });
  });
};

export default usersRoutes;