import { defaultPagination } from '../constants/defaultPagination.js';
import { SORT_ORDER } from '../constants/sort_order.js';
import { ContactsCollection } from '../db/model/contacts.js';
import { createFilterQueries } from '../utils/filters/createFilterQueries.js';
import { calculatePaginationData } from '../utils/pagination/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  userId,
  page = defaultPagination.page,
  perPage = defaultPagination.perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = ContactsCollection.find({ userId });

  createFilterQueries(contactQuery, filter);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  if (page > paginationData.totalPages || page < 1)
    throw createHttpError(400, 'Page is out of range');

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByID = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  option = {},
) => {
  const rawData = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      includeResultMetadata: true,
      ...option,
    },
  );

  if (!rawData || !rawData.value) return null;

  return {
    contact: rawData.value,
    isNew: Boolean(rawData?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
