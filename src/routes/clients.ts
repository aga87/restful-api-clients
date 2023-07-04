import { Router } from 'express';
import { addClient } from '../controllers/clients';

const router = Router();

router.post('/', addClient);

export { router as clients };
