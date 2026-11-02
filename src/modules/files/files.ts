import type { FastifyPluginAsync } from 'fastify';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { randomUUID } from 'node:crypto';

const filesRoutes: FastifyPluginAsync = async (app) => {

  app.post('/upload', async (request, reply) => {

    const file = await request.file();

    if (!file) {
      return reply.code(400).send({
        message: 'No file received',
      });
    }

    // Obtener el contenido del archivo
    const buffer = await file.toBuffer();

    // Crear directorio si no existe
    const uploadDirectory = join(process.cwd(), 'uploads');

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    // Evitar utilizar directamente el nombre proporcionado
    // por el cliente.
    const extension = extname(file.filename);
    const filename = `${randomUUID()}${extension}`;

    const filePath = join(uploadDirectory, filename);

    await writeFile(filePath, buffer);

    return reply.code(201).send({
      message: 'File uploaded successfully',
      file: {
        originalName: file.filename,
        filename,
        mimetype: file.mimetype,
        size: buffer.length,
      },
    });
  });

};

export default usersRoutes;
