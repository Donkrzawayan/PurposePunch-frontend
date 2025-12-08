import { type DecisionDto } from '../../types';
import { t } from '../../textResources';
import { StatusBadge } from '../common/StatusBadge';
import { VisibilityBadge } from '../common/VisibilityBadge';

interface Props {
  decision: DecisionDto;
}

export const ReflectionHeader = ({ decision }: Props) => {
  return (
    <div className="border-b pb-4 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{decision.title}</h1>
        <div className="mt-2 flex items-center gap-2">
          <StatusBadge status={decision.status} />
          <VisibilityBadge visibility={decision.visibility} />
        </div>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>{t.decision.expectedReflectionDate}:</p>
        <p className="font-medium">{new Date(decision.expectedReflectionDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
