import { SORT_ORDER } from '../../constants/sort_order.js';

const parseSortOrder = (sortOrder) => {
  const isKnowOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isKnowOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'contactType',
    'isFavorite',
    'createdAt',
    'updatedAt',
  ];
  return keysOfContact.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
