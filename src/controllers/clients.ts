import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getClientsFromDB, addClientToDB } from '../services/clients-db';
import { validateClientSchema } from '../models/Client';

export const getClients: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await getClientsFromDB();
    return res.send({
      clients
    });
  } catch (err) {
    next(err);
  }
};

export const addClient: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newClient = req.body;
  const error = validateClientSchema(newClient);
  if (error) return res.status(400).send(error);

  try {
    const client = await addClientToDB(newClient);

    // Note: in a real-world scenario it is likely we would have GET clients/:id endpoint. It is then best practice to set the location header:
    // res.setHeader(
    //   'location',
    //   `${process.env.BASE_URL}/${req.originalUrl}/${savedItem?._id}`
    // );

    res.status(201).send({
      client
    });
  } catch (err) {
    next(err);
  }
};
