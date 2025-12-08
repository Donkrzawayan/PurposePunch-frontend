import { Visibility } from '../../types';
import { t } from '../../textResources';

export const VisibilityBadge = ({ visibility }: { visibility: Visibility }) => {
  const config = {
    [Visibility.Public]: {
      text: t.decision.visibility.public,
      style: "bg-purple-100 text-purple-800 border-purple-200"
    },
    [Visibility.Private]: {
      text: t.decision.visibility.private,
      style: "bg-gray-100 text-gray-600 border-gray-200"
    },
  };

  const current = config[visibility] || config[Visibility.Private];
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${current.style}`}>
      {current.text}
    </span>
  );
};
