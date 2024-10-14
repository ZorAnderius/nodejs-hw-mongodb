const milliseconds = 1000;
const seconds = 60;
const minutes = 60;
const hours = 24;

export const tokenLifeTime= Object.freeze({
  FIFTEEN_MINUTE: milliseconds * seconds * 15,
  DAYS: milliseconds * seconds * minutes * hours * 30,
});
