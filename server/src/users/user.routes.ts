import { Router } from 'express';
import { createUser, getAllUsers } from './users.controller';

const router = Router();

router.post('/create-user', createUser);
router.get('/get-users', getAllUsers);

export default router;
