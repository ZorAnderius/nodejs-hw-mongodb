export const createFilterQueries = (queryEntry, filter) => {
  if (filter?.name) {
    queryEntry.where('name', new RegExp(filter.name, 'i'));
  }

  if (filter?.email) {
    queryEntry.where('email', new RegExp(filter.email, 'i'));
  }

  if (filter?.phone) {
    queryEntry.where('phoneNumber', new RegExp(filter.phone, 'i'));
  }

  if (filter?.isFavourite !== undefined) {
    queryEntry.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter?.type) {
    queryEntry.where('contactType').equals(filter.type);
  }
};
