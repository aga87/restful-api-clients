export type PaginationInput = {
  page: unknown;
  pageSize: unknown;
  defaultPageSize: number;
  maxPageSize: number;
  totalCount: number;
};

type Pagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

type ReturnType = {
  skip: number;
  pagination: Pagination;
};

export const getPagination = ({
  page,
  pageSize,
  defaultPageSize,
  maxPageSize,
  totalCount
}: PaginationInput): ReturnType => {
  // Convert page into an integer if possible, else default to 1
  let pageNo = page ? parseInt(page.toString(), 10) || 1 : 1;

  // Convert pageSize into an integer if possible, else use the default
  let pageSizeNo = pageSize
    ? parseInt(pageSize.toString(), 10) || defaultPageSize
    : defaultPageSize;

  if (pageSizeNo > maxPageSize) {
    pageSizeNo = maxPageSize;
  }

  // If there is zero results, treat it as one page
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSizeNo) : 1;

  // If the requested page number does no exist, show the last page
  if (pageNo > totalPages) {
    pageNo = totalPages;
  }

  // No of results to skip
  const skip = (pageNo - 1) * pageSizeNo;

  return {
    skip,
    pagination: {
      currentPage: pageNo,
      pageSize: pageSizeNo,
      totalCount,
      totalPages
    }
  };
};
