import type { DecisionDto } from '../../types';
import { t } from '../../textResources';
import { ReadOnlyField } from '../common/ReadOnlyField';
import { PhaseHeader } from './PhaseHeader';
import { Card } from '../common/Card';

interface Props {
  decision: DecisionDto;
}

export const Phase2Result = ({ decision }: Props) => {

  const isLateReflection = (reflectedAt: string, expectedAt: string) => {
    return new Date(reflectedAt) > new Date(expectedAt);
  };

  const renderSatisfactionText = (level: number | null) => {
    if (level === null) return "N/A";
    return t.reflection.satisfaction.star.repeat(level + 1) + t.reflection.satisfaction.emptyStar.repeat(4 - level);
  };

  return (
    <Card className="bg-green-50 border-green-200">
      <PhaseHeader title={t.reflection.phase2.title} className="text-green-800" />

      <div className="space-y-6">
        {decision.reflectedAt && (
          <div className="text-sm border-b pb-2 mb-2">
            <span className="text-gray-500 mr-2">{t.reflection.phase2.reflectedAtLabel}</span>
            <span className="font-medium">{new Date(decision.reflectedAt).toLocaleString()}</span>
            {isLateReflection(decision.reflectedAt, decision.expectedReflectionDate) && (
              <span className="text-red-600 font-bold ml-2 text-xs uppercase tracking-wide">
                {t.reflection.phase2.lateReflection}
              </span>
            )}
          </div>
        )}

        <ReadOnlyField label={t.reflection.phase2.actualOutcomeLabel}>
          {decision.actualOutcome}
        </ReadOnlyField>

        <ReadOnlyField label={t.reflection.phase2.lessonsLabel}
          contentClassName={!decision.lessonsLearned ? 'italic text-gray-600' : ''}
        >
          {decision.lessonsLearned || t.reflection.phase2.missingLessons}
        </ReadOnlyField>

        <ReadOnlyField label={t.reflection.phase2.satisfactionLabel} contentClassName="text-xl font-bold">
          {renderSatisfactionText(decision.satisfaction)}
        </ReadOnlyField>

        {decision.privateNotes && (
          <div className="mt-6 p-4 bg-white/60 rounded border border-gray-200">
            <ReadOnlyField label={t.reflection.phase2.privateNotesLabel} contentClassName="italic text-gray-600 text-sm">
              {decision.privateNotes}
            </ReadOnlyField>
          </div>
        )}
      </div>
    </Card>
  );
};
