import { Router } from 'express';
import { getHealthCheck } from '../controllers/health-check';

const router = Router();

router.get('/', getHealthCheck);

export { router as healthCheck };
