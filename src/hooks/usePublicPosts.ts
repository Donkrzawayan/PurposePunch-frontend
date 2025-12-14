import { useState, useEffect, useCallback } from 'react';
import { publicService } from '../api/services';
import type { PublicPostDto } from '../types';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';

export const usePublicPosts = (pageSize: number = 10) => {
  const [posts, setPosts] = useState<PublicPostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNumber: number) => {
    try {
      setError(null);
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const result = await publicService.getAll(pageNumber, pageSize);

      setPosts(prev => pageNumber === 1 ? result.items : [...prev, ...result.items]);
      setHasMore(result.pageNumber < result.totalPages);
      setPage(pageNumber);

    } catch (err) {
      setError(getErrorMessage(err, t.common.networkError));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const loadNextPage = useCallback(() => {
    if (!loading && !loadingMore && hasMore) {
      fetchPosts(page + 1);
    }
  }, [loading, loadingMore, hasMore, page, fetchPosts]);

  return {
    posts,
    loading,
    loadingMore,
    error,
    hasMore,
    loadNextPage,
    refresh: useCallback(() => fetchPosts(1), [fetchPosts])
  };
};
