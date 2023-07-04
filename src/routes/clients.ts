import { Router } from 'express';
import { getClients, addClient } from '../controllers/clients';

const router = Router();

router.get('/', getClients);

router.post('/', addClient);

export { router as clients };
