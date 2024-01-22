import {
  useInfiniteQuery,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { APIError, fetchAPI } from "../functions/api";
import {
  APIPaths,
  APIRequests,
  APIResponse,
  APIRequest,
  APIMethods,
} from "../types/api.ts";
import { useMemo } from "react";

export function useFetchQuery<
  Path extends APIPaths,
  Options extends APIRequests<Path>
>(
  path: Path,
  options?: Options,
  queryOptions?: UseQueryOptions<
    unknown,
    APIError,
    APIResponse<Path, Options["method"]>
  >,
) {
  const key = [
    path,
    options,
  ];
  return {
    key,
    ...useQuery({
      queryKey: key,
      queryFn: () => fetchAPI(path, options),
      ...queryOptions,
    }),
  };
}

export function useInfiniteFetchQuery<
  Path extends APIPaths,
  Options extends APIRequests<Path>
>(path: Path, options?: Options) {
  const key = [
    path,
    options,
  ];

  const result = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: key,
    queryFn: ({ pageParam }) => fetchAPI(path, {
      ...options,
      query: {
        ...(options && "query" in options ? options.query : {}),
        page: pageParam,
      },
    } as any),
    getNextPageParam: (data, pages) => {
      return pages.length < (data as any).page_total
        ? pages.length + 1
        : undefined;
    },
  });
  const results = useMemo(() => {
    return result?.data?.pages.map((v: any) => v.results).flat();
  }, [result?.data?.pages]);
  return {
    ...result,
    results,
  };
}

export function useFetchMutation<
  Path extends APIPaths,
  Method extends APIMethods<Path>
>(
  path: Path,
  method: Method,
  queryOptions?: UseMutationOptions<
    APIResponse<Path, Method>,
    APIError,
    Omit<APIRequest<Path, Method>, "method">
  >,
) {
  return useMutation<
    APIResponse<Path, Method>,
    APIError,
    Omit<APIRequest<Path, Method>, "method">
  >({
    ...(queryOptions as any),
    mutationFn: (request) => fetchAPI(path, { ...request, method }),
    onError: (err, variables) => {
      queryOptions?.onError?.(err, variables, undefined);
      alert(err.message);
    },
  });
}
