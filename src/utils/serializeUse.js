export const serializeUser = ({ _id, name, email, createdAt, updatedAt }) => ({
  _id,
  name,
  email,
  createdAt,
  updatedAt,
});