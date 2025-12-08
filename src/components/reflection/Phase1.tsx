import type { DecisionDto } from '../../types';
import { t } from '../../textResources';
import { ReadOnlyField } from '../common/ReadOnlyField';
import { PhaseHeader } from './PhaseHeader';
import { Card } from '../common/Card';

interface Props {
  decision: DecisionDto;
}

export const Phase1 = ({ decision }: Props) => {
  return (
    <Card className="bg-gray-50 border-gray-200 h-fit">
      <PhaseHeader title={t.reflection.phase1.title} />
      <div className="space-y-4">
        <ReadOnlyField label={t.decision.description}>
          {decision.description}
        </ReadOnlyField>
        
        <ReadOnlyField label={t.decision.expectedOutcome}>
          {decision.expectedOutcome}
        </ReadOnlyField>
      </div>
    </Card>
  );
};
