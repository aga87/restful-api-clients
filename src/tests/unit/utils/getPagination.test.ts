import { getPagination } from '../../../utils/getPagination';
import type { PaginationInput } from '../../../utils/getPagination';

describe('getPagination', () => {
  let input: PaginationInput;

  beforeEach(() => {
    input = {
      page: '2',
      pageSize: '10',
      defaultPageSize: 20,
      maxPageSize: 50,
      totalCount: 100
    };
  });

  it('should correctly calculate the total number of pages', () => {
    const result = getPagination(input);
    expect(result.pagination.totalPages).toBe(10);
  });

  it('should return the requested page if it exists', () => {
    const result = getPagination(input);
    expect(result.pagination.currentPage).toBe(2);
  });

  it('should return first page if the requested page is invalid', () => {
    const invalidPages = [0, undefined, [], {}, false];
    invalidPages.forEach((invalidPage) => {
      input.page = invalidPage;
      const result = getPagination(input);
      expect(result.pagination.currentPage).toBe(1);
    });
  });

  it('should return first page for total result count of 0', () => {
    input.totalCount = 0;
    const result = getPagination(input);
    expect(result.pagination.currentPage).toBe(1);
  });

  it('should return last page if the requested page exceeds total pages', () => {
    input.page = 100;
    const result = getPagination(input);
    expect(result.pagination.currentPage).toBe(10);
  });

  it('should return the requested page size if it is valid', () => {
    const result = getPagination(input);
    expect(result.pagination.pageSize).toBe(10);
  });

  it('should return the default page size if the requested page size is invalid', () => {
    const invalidPageSizes = [0, undefined, [], {}, false];
    invalidPageSizes.forEach((invalidPageSize) => {
      input.pageSize = invalidPageSize;
      const result = getPagination(input);
      expect(result.pagination.pageSize).toBe(20);
    });
  });

  it('should return max page size if the requested page size exceeds max page size ', () => {
    input.pageSize = 1000;
    const result = getPagination(input);
    expect(result.pagination.pageSize).toBe(50);
  });

  it('should correctly calculate the number of results to skip', () => {
    const result = getPagination(input);
    expect(result.skip).toBe(10);
  });
});
