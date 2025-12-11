import { useState } from 'react';
import type { PublicPostDto } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { publicService } from '../../api/services';
import { cn } from '../../utils/cn';
import { t } from '../../textResources';
import { PostSection } from './PostSection';

interface Props {
  post: PublicPostDto;
}

export const PublicPostCard = ({ post }: Props) => {
  const [votes, setVotes] = useState(post.upvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(post.isUpvoted);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const lessonsOrOutcome = post.lessonsLearned || post.actualOutcome || "";
  const contentIsLong = (post.description.length + lessonsOrOutcome.length) > 200;

  const handleUpvote = async () => {
    if (hasUpvoted || isUpvoting) return;

    setIsUpvoting(true);
    setVotes((prev) => prev + 1);
    setHasUpvoted(true);

    try {
      await publicService.upvote(post.id);
    } catch (error) {
      console.error("Upvote failed", error);
      setVotes((prev) => prev - 1);
      setHasUpvoted(false);
    } finally {
      setIsUpvoting(false);
    }
  };

  const renderSatisfactionEmoji = (level: number | null) => {
    const emojis = t.reflection.satisfaction.emojis;
    return level !== null ? emojis[level] : "";
  };

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col gap-0 p-0 overflow-hidden">

      <div className="px-6 pt-5 pb-3 border-b border-gray-100 flex justify-between items-start bg-white">
        <div>
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{post.title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full tracking-wider">
              {post.authorNickname}
            </span>
            <span className="text-gray-400">
              • {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="text-2xl" title="Satisfaction Level">
          {renderSatisfactionEmoji(post.satisfaction)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 text-sm">

        <div className="p-6 bg-white">
          <PostSection
            title={t.community.description}
            isExpanded={isExpanded}
            className="text-gray-600"
          >
            {post.description}
          </PostSection>
        </div>

        <div className="p-6 bg-gray-50 md:border-l border-t md:border-t-0 border-gray-100">
          <PostSection
            title={t.community.reflection}
            isExpanded={isExpanded}
            className="text-gray-800 italic"
          >
            {lessonsOrOutcome}
          </PostSection>
        </div>

      </div>

      <div className="relative px-6 py-3 bg-white border-t border-gray-100 flex justify-center items-center min-h-[60px]">
        <div className="absolute left-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUpvote}
            disabled={hasUpvoted || isUpvoting}
            className={cn(
              "text-xs transition-all flex items-center gap-2",
              hasUpvoted
                ? "text-orange-700 border-orange-300 cursor-default disabled:opacity-100 hover:bg-orange-50"
                : "hover:border-orange-300 hover:text-orange-600"
            )}
          >
            <span>{t.community.upvote}</span>
            <span className="font-bold">{votes}</span>
          </Button>
        </div>

        {contentIsLong ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {isExpanded ? t.community.showLess : t.community.showFull}
          </button>
        ) : (
          <span />
        )}
      </div>
    </Card>
  );
};
