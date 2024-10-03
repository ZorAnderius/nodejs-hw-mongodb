import { Router } from 'express';
import { addContactController, getContactByIdController, getContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(addContactController));

export default router;