import { RequestHandler, Request, Response, NextFunction } from 'express';
import {
  addClientToDB,
  getClientsFromDB,
  getClientsTotalInDB
} from '../services/clients-db';
import { validateClientSchema } from '../models/Client';
import { clientsHATEOAS, selfHATEOAS } from '../utils/hateoas';
import { getPagination } from '../utils/getPagination';

export const getClients: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, pageSize } = req.query;

    const totalCount = await getClientsTotalInDB();

    const pagination = getPagination({
      page: page,
      pageSize: pageSize,
      defaultPageSize: 10,
      maxPageSize: 20,
      totalCount
    });

    const clients = await getClientsFromDB({
      skip: pagination.skip,
      pageSize: pagination.pagination.pageSize
    });

    return res.send({
      clients,
      pagination: pagination.pagination,
      _links: [
        selfHATEOAS(req),
        clientsHATEOAS().clients,
        clientsHATEOAS().addClient
      ]
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
  if (error)
    return res.status(400).send({
      error,
      _links: [
        selfHATEOAS(req),
        clientsHATEOAS().addClient,
        clientsHATEOAS().clients
      ]
    });

  try {
    const client = await addClientToDB(newClient);

    // Note: in a real-world scenario it is likely we would have GET clients/:id endpoint. It is then best practice to set the location header:
    // res.setHeader(
    //   'location',
    //   `${process.env.BASE_URL}/${req.originalUrl}/${savedItem?._id}`
    // );

    res.status(201).send({
      client,
      _links: [selfHATEOAS(req), clientsHATEOAS().clients]
    });
  } catch (err) {
    next(err);
  }
};
