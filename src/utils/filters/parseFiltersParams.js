const parseType = (type) => {
  if (typeof type !== 'string') return;
  const isContactType = ['work', 'home', 'personal'].includes(type);
  if (isContactType) return type;
};
const parseString = (string) => {
  if (string?.length > 0) return string.trim();
};

const parseIsFavourite = (isFavourite) => {
  const parsedFavourite = isFavourite && JSON.parse(isFavourite);
  if (typeof parsedFavourite === 'boolean') return parsedFavourite;
};

export const parseFilterParams = (query) => {
  const { name, email, phone, type, isFavourite } = query;
  const parsedName = parseString(name);
  const parsedEmail = parseString(email);
  const parsedPhone = parseString(phone);
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    name: parsedName,
    email,
    parsedEmail,
    phone: parsedPhone,
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
