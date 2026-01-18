import { getApiPublicPosts } from '../api/generated/public-posts/public-posts';
import { t } from '../textResources';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/errorUtils';

export const usePublicPosts = (pageSize: number = 10) => {
  const query = useInfiniteQuery({
    queryKey: ['public-posts', pageSize],

    queryFn: async ({ pageParam = 1 }) => {
      const result = await getApiPublicPosts({
        PageNumber: pageParam,
        PageSize: pageSize,
      });
      return result;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
  });

  const posts = query.data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return {
    posts,
    loading: query.isLoading,
    loadingMore: query.isFetchingNextPage,
    error: query.isError ? getErrorMessage(query.error, t.common.networkError) : null,
    hasMore: query.hasNextPage,
    loadNextPage: query.fetchNextPage,
    refresh: query.refetch
  };
};
