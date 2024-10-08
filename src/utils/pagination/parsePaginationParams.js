import { defaultPagination } from '../../constants/defaultPagination.js';
import { parseNumber } from '../parseNumber.js';

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  return {
    page: parseNumber(page, defaultPagination.page),
    perPage: parseNumber(perPage, defaultPagination.perPage),
  };
};
