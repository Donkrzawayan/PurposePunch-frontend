import { useState } from 'react';
import { DecisionStatus, SatisfactionScale, Visibility } from '../../types';
import { t } from '../../textResources';
import { FormField } from '../common/FormField';
import { PhaseHeader } from './PhaseHeader';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Alert } from '../common/Alert';
import { SatisfactionSelector } from './SatisfactionSelector';

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
  const [error, setError] = useState<string | null>(null);

  const getTitleColor = () => {
    if (status === DecisionStatus.Abandoned) return 'text-red-800';
    return 'text-blue-800';
  };

  const validateAndSubmit = (shouldPublish: boolean) => {
    if (!actualOutcome.trim()) {
      setError(t.reflection.errors.missingOutcome);
      return;
    }

    if (satisfaction === null) {
      setError(t.reflection.errors.missingSatisfaction);
      return;
    }

    setError(null);
    onSubmit({
      actualOutcome,
      lessonsLearned,
      privateNotes,
      satisfaction
    }, shouldPublish);
  };

  return (
    <Card className="border-blue-200 shadow-md">
      <PhaseHeader title={t.reflection.phase2.title} className={getTitleColor()} />

      <div className="space-y-6">
        <p className="text-sm text-gray-600 mb-4 italic">{t.reflection.phase2.formTitle}</p>
        <Alert message={error} />

        <FormField
          id="outcome" label={t.reflection.phase2.actualOutcomeLabel} error={!actualOutcome.trim() ? error : null} required
          type="textarea"
          value={actualOutcome}
          onChange={(e) => {
            setActualOutcome(e.target.value);
            if (error) setError(null);
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

        <SatisfactionSelector
          value={satisfaction}
          required
          onChange={(val) => {
            setSatisfaction(val);
            if (error) setError(null);
          }}
          error={error && satisfaction === null ? t.reflection.errors.missingSatisfaction : null}
        />

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
