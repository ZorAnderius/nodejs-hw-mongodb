import { ContactsCollection } from '../db/model/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactByID = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, option = {}) => {
  const rawData = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
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

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
