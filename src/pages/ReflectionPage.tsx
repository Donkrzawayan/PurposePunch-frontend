import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { decisionService } from '../api/services';
import { type DecisionDto, DecisionStatus, type UpdateDecisionCommand, type ProblemDetails } from '../types';
import { t } from '../textResources';
import { ReflectionHeader } from '../components/reflection/ReflectionHeader';
import { Phase1 } from '../components/reflection/Phase1';
import { Phase2Result } from '../components/reflection/Phase2Result';
import { Phase2Form, type ReflectionFormData } from '../components/reflection/Phase2Form';

const ReflectionPage = () => {
  const { id } = useParams<{ id: string }>();

  const [decision, setDecision] = useState<DecisionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDecision = async () => {
      if (!id) return;
      try {
        const data = await decisionService.getById(Number(id));
        setDecision(data);
      } catch (err) {
        console.error(err);
        setError(t.common.networkError);
      } finally {
        setLoading(false);
      }
    };
    fetchDecision();
  }, [id]);

  const handleFormSubmit = async (formData: ReflectionFormData, shouldPublish: boolean) => {
    if (!decision) return;
    setIsSubmitting(true);

    try {
      const command: UpdateDecisionCommand = {
        id: decision.id,
        title: decision.title,
        description: decision.description,
        expectedOutcome: decision.expectedOutcome,
        visibility: decision.visibility,
        actualOutcome: formData.actualOutcome,
        lessonsLearned: formData.lessonsLearned,
        privateNotes: formData.privateNotes,
        satisfaction: formData.satisfaction
      };

      await decisionService.update(decision.id, command);

      if (shouldPublish) {
        await decisionService.publish(decision.id);
      }

      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const problem = err.response.data as ProblemDetails;
        setError(problem.detail || t.reflection.errors.updateFailed);
      } else {
        setError(t.common.networkError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">{t.common.loading}</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!decision) return <div className="p-8 text-center">{t.reflection.errors.missingDecision}</div>;

  const isReadOnly = decision.status === DecisionStatus.Reflected;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">

      <ReflectionHeader decision={decision} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <Phase1 decision={decision} />

        {isReadOnly ? (
          <Phase2Result decision={decision} />
        ) : (
          <Phase2Form
            status={decision.status}
            visibility={decision.visibility}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ReflectionPage;
