import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValid } from '../middlewares/isValid.js';

const router = Router();

router.use('/:contactId', isValid('contactId'));
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
