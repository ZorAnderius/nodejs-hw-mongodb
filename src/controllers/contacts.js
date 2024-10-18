import createHttpError from 'http-errors';
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/pagination/parsePaginationParams.js';
import { parseSortParams } from '../utils/sort/parseSotrParams.js';
import { parseFilterParams } from '../utils/filters/parseFiltersParams.js';
import { saveFileToUploadDir } from '../utils/saveFilesTToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { CLOUDINARY } from '../constants/cloudinaty.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByID(contactId, req.user._id);
  if (!contact) return next(createHttpError(404, 'Contact not found'));
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl =
      env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true'
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
  }
  const contact = await addContact({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(
    contactId,
    { ...req.body, photo: photoUrl },
    req.user._id,
  );

  if (!result) return next(createHttpError(404, 'Contact not found'));

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) return next(createHttpError(404, 'Contact not found'));
  res.status(204).send();
};
