import {
  useInfiniteQuery,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { APIError, fetchAPI } from "../functions/api";
import { APIPaths, APIRequests, APIResponse, APIRequest, APIMethods } from "../types/api.ts";
import { useMemo } from "react";
import { useAccessToken } from "./useAuth.ts";

type ApiResponseContent<Path extends APIPaths> = APIResponse<Path, "get"> extends {
  content?: infer Content;
}
  ? Content
  : never;

export function useFetchQuery<Path extends APIPaths, Options extends APIRequests<Path>>(
  path: Path,
  options?: Options & { headers?: Record<string, string> },
  queryOptions?: UseQueryOptions<unknown, APIError, APIResponse<Path, Options["method"]>>,
) {
  const key = [path, options];
  const token = useAccessToken();
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };
  const optionsWithHeaders = {
    ...options,
    headers: {
      ...options?.headers,
      ...authHeaders,
    },
  };
  return {
    key,
    ...useQuery({
      queryKey: key,
      queryFn: () => fetchAPI(path, optionsWithHeaders as any as Options),
      ...queryOptions,
    }),
  };
}

export function useInfiniteFetchQuery<Path extends APIPaths, Options extends APIRequests<Path>>(
  path: Path,
  options?: Options,
) {
  const key = [path, options];

  const result = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: key,
    queryFn: ({ pageParam }) =>
      fetchAPI(path, {
        ...options,
        query: {
          ...(options && "query" in options ? options.query : {}),
          page: pageParam,
        },
      } as any),
    getNextPageParam: (data, pages) => {
      return pages.length < data.totalPages ? pages.length + 1 : undefined;
    },
  });
  const results = useMemo(() => {
    return result?.data?.pages.map(v => v.content).flat() ?? [];
  }, [result?.data?.pages]) as ApiResponseContent<Path>;
  return {
    ...result,
    results,
  };
}

export function useFetchMutation<Path extends APIPaths, Method extends APIMethods<Path>>(
  path: Path,
  method: Method,
  queryOptions?: UseMutationOptions<
    APIResponse<Path, Method>,
    APIError,
    Omit<APIRequest<Path, Method>, "method">
  >,
) {
  return useMutation<APIResponse<Path, Method>, APIError, Omit<APIRequest<Path, Method>, "method">>({
    ...(queryOptions as any),
    mutationFn: request => fetchAPI(path, { ...request, method }),
    onError: (err, variables) => {
      queryOptions?.onError?.(err, variables, undefined);
      alert(err.message);
    },
  });
}
