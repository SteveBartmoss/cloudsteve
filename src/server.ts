import { buildApp } from './app.js';

const app = buildApp();

const start = async (): Promise<void> => {
  try {
    const port = Number(process.env.PORT ?? 3000);
    const host = process.env.HOST ?? '0.0.0.0';

    await app.listen({
      port,
      host,
    });
  } catch (error) {
    app.log.error(error);

    await app.close();

    process.exitCode = 1;
  }
};

await start();
