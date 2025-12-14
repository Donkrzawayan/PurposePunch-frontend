import { PageContainer } from '../components/layout/PageContainer';
import { PublicPostCard } from '../components/community/PublicPostCard';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { t } from '../textResources';
import { usePublicPosts } from '../hooks/usePublicPosts';

const CommunityFeed = () => {
  const { posts, loading, loadingMore, error, hasMore, loadNextPage } = usePublicPosts();

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
                onClick={loadNextPage}
                isLoading={loadingMore}
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
