export function fakeSinglePagination() {
  return {
    pageable: {
      pageNumber: 1,
      pageSize: 1,
      offset: 0,
      sort: {
        sorted: false,
        empty: false,
        unsorted: false,
      },
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 20,
    size: 20,
    number: 20,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false,
    },
    first: true,
    numberOfElements: 20,
    empty: false,
  };
}
