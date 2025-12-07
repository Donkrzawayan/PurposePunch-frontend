import type { DecisionDto } from '../../types';
import { t } from '../../textResources';
import { ReadOnlyField } from '../common/ReadOnlyField';

interface Props {
  decision: DecisionDto;
}

export const Phase1 = ({ decision }: Props) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
      <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
        {t.reflection.phase1.title}
      </h2>
      <div className="space-y-4">
        <ReadOnlyField label={t.decision.description}>
          {decision.description}
        </ReadOnlyField>
        <ReadOnlyField label={t.decision.expectedOutcome}>
          {decision.expectedOutcome}
        </ReadOnlyField>
      </div>
    </div>
  );
};
