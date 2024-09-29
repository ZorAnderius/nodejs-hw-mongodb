import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { connect } from './constants/connection.js';
import { getAllContacts, getContactByID } from './services/contacts.js';

const PORT = Number(env(connect.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      next({error});
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactByID(contactId);
      if (!contact) {
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    message = status === 500 ? 'Something went wrong' : message;
    res.status(status).json({
      message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  });
};
