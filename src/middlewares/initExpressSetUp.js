import cors from 'cors';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import express from 'express';

export const initExpressSetUp = (app) => {
  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'req,res,hostname,pid',
        messageFormat: '{msg}',
      },
    },
  });
    
    app.use(pinoMiddleware({ logger }));
    return logger;
};
