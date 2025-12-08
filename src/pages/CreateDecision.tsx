import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decisionService } from '../api/services';
import { type CreateDecisionCommand, Visibility } from '../types';
import { t } from '../textResources';
import { FormField } from '../components/common/FormField';
import { getErrorMessage } from '../utils/errorUtils';
import { Button } from '../components/common/Button';

const CreateDecision = () => {
  const navigate = useNavigate();

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [reflectionDate, setReflectionDate] = useState(defaultDate.toISOString().slice(0, 16));
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Private);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const selectedDate = new Date(reflectionDate);
    const oneHourInFuture = new Date(new Date().getTime() + 60 * 60 * 1000);
    if (selectedDate < oneHourInFuture) {
      setError(t.createDecision.errors.dateTooSoon);
      return;
    }

    setIsSubmitting(true);

    try {
      const command: CreateDecisionCommand = {
        title,
        description,
        expectedOutcome,
        visibility,
        expectedReflectionDate: new Date(reflectionDate).toISOString()
      };

      await decisionService.create(command);
      navigate('/');

    } catch (err) {
      setError(getErrorMessage(err, t.createDecision.errors.createFailed));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.createDecision.title}</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormField
            id="title" label={t.createDecision.form.titleLabel} required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.createDecision.form.titlePlaceholder}
            maxLength={60}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <FormField
              id="date" label={t.decision.expectedReflectionDate} required helperText={t.createDecision.form.dateHelp}
              type="datetime-local"
              value={reflectionDate}
              onChange={(e) => setReflectionDate(e.target.value)}
            />

            <FormField
              id="visibility" label={t.decision.visibility.label} required
              type="select"
              value={visibility}
              onChange={(e) => setVisibility(Number(e.target.value) as Visibility)}
              options={[
                { value: Visibility.Private, label: t.decision.visibility.private },
                { value: Visibility.Public, label: t.decision.visibility.public }
              ]}
            />

          </div>

          <FormField
            id="description" label={t.decision.description} required
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.createDecision.form.descriptionPlaceholder}
            rows={4}
          />

          <FormField
            id="outcome" label={t.decision.expectedOutcome} required
            type="textarea"
            value={expectedOutcome}
            onChange={(e) => setExpectedOutcome(e.target.value)}
            placeholder={t.createDecision.form.outcomePlaceholder}
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {t.createDecision.form.submitButton}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDecision;
