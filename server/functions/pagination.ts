export function fakeSinglePagination(page: number, max: number = 3, limit: number = 20) {
  return {
    pageable: {
      pageNumber: page,
      pageSize: limit,
      offset: limit * (page - 1),
      sort: {
        sorted: false,
        empty: false,
        unsorted: false,
      },
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: max,
    totalElements: limit * max,
    size: limit,
    number: limit,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false,
    },
    first: true,
    numberOfElements: limit,
    empty: false,
  };
}
