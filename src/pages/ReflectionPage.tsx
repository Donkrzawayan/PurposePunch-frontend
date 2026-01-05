import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDecisions } from '../api/generated/decisions/decisions';
import { type DecisionDto, DecisionStatus, type UpdateDecisionCommand } from '../api/generated/model';
import { t } from '../textResources';
import { ReflectionHeader } from '../components/reflection/ReflectionHeader';
import { Phase1 } from '../components/reflection/Phase1';
import { Phase2Result } from '../components/reflection/Phase2Result';
import { Phase2Form, type ReflectionFormData } from '../components/reflection/Phase2Form';
import { PageContainer } from '../components/layout/PageContainer';
import { Alert } from '../components/common/Alert';
import { useAsyncActionForForm } from '../hooks/useAsyncActionForForm';

const ReflectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isSubmitting, error, setError, execute } = useAsyncActionForForm();

  const [decision, setDecision] = useState<DecisionDto | null>(null);
  const [loading, setLoading] = useState(true);

  const { getApiDecisionsId, putApiDecisionsId, postApiDecisionsIdPublish } = getDecisions();

  useEffect(() => {
    const fetchDecision = async () => {
      if (!id) return;
      try {
        const data = await getApiDecisionsId(Number(id))
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

    await execute(
      async () => {
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

        await putApiDecisionsId(decision.id, command);

        if (shouldPublish) {
          await postApiDecisionsIdPublish(decision.id);
        }

        window.location.reload();
      },
      t.reflection.errors.updateFailed
    );
  };

  if (loading) return <div className="p-8 text-center">{t.common.loading}</div>;
  if (error) return <Alert message={error} />;
  if (!decision) return <div className="p-8 text-center">{t.reflection.errors.missingDecision}</div>;

  const isReadOnly = decision.status === DecisionStatus.Reflected;

  return (
    <PageContainer className="max-w-4xl">
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
    </PageContainer>
  );
};

export default ReflectionPage;
