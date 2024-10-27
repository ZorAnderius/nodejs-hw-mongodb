export const parseNumber = (number, defaultNumber) => {
  if (typeof number !== 'string') return defaultNumber;
  return isNaN(Number(number)) ? defaultNumber : Number(number);
};
