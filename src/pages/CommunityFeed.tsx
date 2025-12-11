import { useEffect, useState } from 'react';
import { publicService } from '../api/services';
import type { PublicPostDto } from '../types';
import { PageContainer } from '../components/layout/PageContainer';
import { PublicPostCard } from '../components/community/PublicPostCard';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';

const CommunityFeed = () => {
  const [posts, setPosts] = useState<PublicPostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    loadPosts(1);
  }, []);

  const loadPosts = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setIsLoadingMore(true);

      const result = await publicService.getAll(pageNumber, 10);

      if (pageNumber === 1) {
        setPosts(result.items);
      } else {
        setPosts(prev => [...prev, ...result.items]);
      }

      setHasMore(result.pageNumber < result.totalPages);
      setPage(pageNumber);
    } catch (err) {
      setError(getErrorMessage(err, t.common.networkError));
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    loadPosts(page + 1);
  };

  return (
    <PageContainer className="max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{t.community.title}</h1>
        <p className="text-gray-500 mt-2">{t.community.subtitle}</p>
      </div>

      <Alert message={error} />

      {loading ? (
        <div className="text-center py-12">{t.common.loading}</div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed">
              {t.community.empty}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <PublicPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {hasMore && posts.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="secondary"
                onClick={handleLoadMore}
                isLoading={isLoadingMore}
              >
                {t.community.loadMore}
              </Button>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default CommunityFeed;
