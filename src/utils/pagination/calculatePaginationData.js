export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page) && totalPages - page > 0;
  const hasPreviousPage = page !== 1 && page <= totalPages + 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages: totalPages === 0 ? 1 : totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
