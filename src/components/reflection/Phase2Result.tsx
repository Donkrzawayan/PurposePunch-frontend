import { type DecisionDto } from '../../types';
import { t } from '../../textResources';

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
    <div className="p-6 rounded-lg border bg-green-50 border-green-200">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-green-800">
        {t.reflection.phase2.title}
      </h2>

      <div className="space-y-4">
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

        <div>
          <h3 className="text-sm font-semibold uppercase opacity-75">{t.reflection.phase2.actualOutcomeLabel}</h3>
          <p className="text-gray-900 mt-1 whitespace-pre-wrap">{decision.actualOutcome}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase opacity-75">{t.reflection.phase2.lessonsLabel}</h3>
          <p className={`mt-1 whitespace-pre-wrap ${!decision.lessonsLearned ? 'italic text-gray-600' : 'text-gray-900'}`}>
            {decision.lessonsLearned || t.reflection.phase2.missingLessons}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase opacity-75">{t.reflection.phase2.satisfactionLabel}</h3>
          <p className="text-xl mt-1 font-bold">{renderSatisfactionText(decision.satisfaction)}</p>
        </div>

        {decision.privateNotes && (
          <div className="mt-6 p-4 bg-white/60 rounded border border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">{t.reflection.phase2.privateNotesLabel}</h3>
            <p className="text-gray-600 italic text-sm">{decision.privateNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
