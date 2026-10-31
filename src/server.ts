import 'dotenv/config';
import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = buildApp();

const start = async (): Promise<void> => {


  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
  } catch (error) {
    app.log.error(error);
    await app.close();
    process.exitCode = 1;
  }
};

await start();
