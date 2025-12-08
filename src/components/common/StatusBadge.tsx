import { DecisionStatus } from '../../types';
import { t } from '../../textResources';

interface Props {
  status: DecisionStatus;
  className?: string;
}

export const StatusBadge = ({ status, className = 'text-sm' }: Props) => {
  const config = {
    [DecisionStatus.Reflected]: {
      text: t.decision.status.reflected,
      style: 'bg-green-100 text-green-800 border-green-200'
    },
    [DecisionStatus.Abandoned]: {
      text: t.decision.status.abandoned,
      style: 'bg-red-100 text-red-800 border-red-200'
    },
    [DecisionStatus.Active]: {
      text: t.decision.status.active,
      style: 'bg-blue-100 text-blue-800 border-blue-200'
    }
  };

  const current = config[status] || config[DecisionStatus.Active];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium border ${current.style} ${className}`}>
      {current.text}
    </span>
  );
};
