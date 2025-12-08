import { useState } from 'react';
import { DecisionStatus, SatisfactionScale, Visibility } from '../../types';
import { t } from '../../textResources';
import { FormField } from '../common/FormField';
import { PhaseHeader } from './PhaseHeader';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface Props {
  status: DecisionStatus;
  visibility: Visibility;
  isSubmitting: boolean;
  onSubmit: (data: ReflectionFormData, shouldPublish: boolean) => void;
}

export interface ReflectionFormData {
  actualOutcome: string;
  lessonsLearned: string;
  privateNotes: string;
  satisfaction: SatisfactionScale;
}

export const Phase2Form = ({ status, visibility, isSubmitting, onSubmit }: Props) => {
  const [actualOutcome, setActualOutcome] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [satisfaction, setSatisfaction] = useState<SatisfactionScale | null>(null);

  const [hoverSatisfaction, setHoverSatisfaction] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const getTitleColor = () => {
    if (status === DecisionStatus.Abandoned) return 'text-red-800';
    return 'text-blue-800';
  };

  const renderSatisfactionText = (level: number | null) => {
    if (level === null) return t.reflection.phase2.satisfactionPlaceholder;
    return t.reflection.satisfaction[level as keyof typeof t.reflection.satisfaction] || level;
  };

  const validateAndSubmit = (shouldPublish: boolean) => {
    if (!actualOutcome.trim()) {
      setValidationError(t.reflection.errors.missingOutcome);
      return;
    }

    if (satisfaction === null) {
      setValidationError(t.reflection.errors.missingSatisfaction);
      return;
    }

    setValidationError(null);
    onSubmit({
      actualOutcome,
      lessonsLearned,
      privateNotes,
      satisfaction
    }, shouldPublish);
  };

  return (
    <Card className="bg-white border-blue-200 shadow-md">
      <PhaseHeader title={t.reflection.phase2.title} className={getTitleColor()} />

      <div className="space-y-6">
        <p className="text-sm text-gray-600 mb-4 italic">{t.reflection.phase2.formTitle}</p>

        {validationError && (
          <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200 text-sm font-bold">
            {validationError}
          </div>
        )}

        <FormField
          id="outcome" label={t.reflection.phase2.actualOutcomeLabel} error={!actualOutcome.trim() ? validationError : null} required
          type="textarea"
          value={actualOutcome}
          onChange={(e) => {
            setActualOutcome(e.target.value);
            if (validationError) setValidationError(null);
          }}
          placeholder={t.reflection.phase2.actualOutcomePlaceholder}
          rows={4}
        />

        <FormField
          id="lessonsLearned" label={t.reflection.phase2.lessonsLabel}
          type="textarea"
          value={lessonsLearned}
          onChange={(e) => setLessonsLearned(e.target.value)}
          placeholder={t.reflection.phase2.lessonsPlaceholder}
          rows={3}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.reflection.phase2.satisfactionLabel} <span className="text-red-500">*</span>
          </label>
          <div className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg border
            ${validationError && satisfaction === null ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-100'}
          `}>
            <div className="flex justify-between w-full text-xs text-gray-400 mb-2 px-1">
              <span>{t.reflection.satisfaction[SatisfactionScale.VeryDissatisfied]}</span>
              <span>{t.reflection.satisfaction[SatisfactionScale.VerySatisfied]}</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[0, 1, 2, 3, 4].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setSatisfaction(star as SatisfactionScale);
                    if (validationError) setValidationError(null);
                  }}
                  onMouseEnter={() => setHoverSatisfaction(star)}
                  onMouseLeave={() => setHoverSatisfaction(null)}
                  className={`text-3xl transition-transform hover:scale-110 focus:outline-none 
                    ${(hoverSatisfaction !== null ? star <= hoverSatisfaction : (satisfaction !== null && star <= satisfaction))
                      ? 'text-yellow-400 drop-shadow-sm'
                      : 'text-gray-300'
                    }`}
                >
                  {t.reflection.satisfaction.star}
                </button>
              ))}
            </div>
            <div className={`h-5 text-sm font-bold ${satisfaction === null && hoverSatisfaction === null ? 'text-gray-400 italic' : 'text-blue-600'}`}>
              {renderSatisfactionText(hoverSatisfaction !== null ? hoverSatisfaction : satisfaction)}
            </div>
          </div>
        </div>

        <FormField
          id="privateNotes" label={t.reflection.phase2.privateNotesLabel} className="bg-yellow-50"
          type="textarea"
          value={privateNotes}
          onChange={(e) => setPrivateNotes(e.target.value)}
          placeholder={t.reflection.phase2.privateNotesPlaceholder}
          rows={2}
        />

        <div className="pt-4 flex flex-col gap-3">
          {visibility === Visibility.Public && (
            <Button
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              onClick={() => validateAndSubmit(true)}
              disabled={isSubmitting}
            >
              {t.reflection.phase2.confirmPublish}
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            isLoading={isSubmitting}
            onClick={() => validateAndSubmit(false)}
            disabled={isSubmitting}
          >
            {t.reflection.phase2.onlyConfirm}
          </Button>
        </div>
      </div>
    </Card>
  );
};
