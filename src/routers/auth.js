import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema, loginUserSchema } from '../validation/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh');
router.post('/logout');

export default router;
