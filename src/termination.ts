import * as HttpTerminator from 'lil-http-terminator';
import { INestApplication, Logger } from '@nestjs/common';

export const enableGracefulTermination = async (app: INestApplication) => {
  const terminator = HttpTerminator({
    server: app.getHttpServer(),
    gracefulTerminationTimeout: 60000,
    maxWaitTimeout: 60000,
  });
  process.on('SIGTERM', async () => {
    const { success, message, error } = await terminator.terminate();
    if (!success) {
      Logger.error(message, error);
    } else {
      Logger.log('Server gracefully terminated');
    }
    await app.close();
  });
};
