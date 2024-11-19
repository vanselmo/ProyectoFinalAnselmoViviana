import { Router } from 'express';
import { generateData } from '../controllers/mocks.controller.js';
import { mockingUsers } from '../controllers/users.controller.js';
import { mockingPets } from '../controllers/pets.controller.js';

const router = Router();

router.get('/mockingpets', mockingPets);
router.get('/mockingusers', mockingUsers);
router.post('/generateData', generateData);

export default router;