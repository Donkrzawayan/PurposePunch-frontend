import { useParams } from 'react-router-dom';
import { getGetApiDecisionsIdQueryKey, useGetApiDecisionsId, usePostApiDecisionsIdPublish, usePutApiDecisionsId } from '../api/generated/decisions/decisions';
import { DecisionStatus, type UpdateDecisionCommand } from '../api/generated/model';
import { t } from '../textResources';
import { ReflectionHeader } from '../components/reflection/ReflectionHeader';
import { Phase1 } from '../components/reflection/Phase1';
import { Phase2Result } from '../components/reflection/Phase2Result';
import { Phase2Form, type ReflectionFormData } from '../components/reflection/Phase2Form';
import { PageContainer } from '../components/layout/PageContainer';
import { Alert } from '../components/common/Alert';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/errorUtils';

const ReflectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const decisionId = Number(id);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetApiDecisionsId(decisionId);
  const updateMutation = usePutApiDecisionsId();
  const publishMutation = usePostApiDecisionsIdPublish();
  const isSubmitting = updateMutation.isPending || publishMutation.isPending;

  const handleFormSubmit = async (formData: ReflectionFormData, shouldPublish: boolean) => {
    if (!data) return;

    try {
      const command: UpdateDecisionCommand = {
        id: data.id,
        title: data.title,
        description: data.description,
        expectedOutcome: data.expectedOutcome,
        visibility: data.visibility,
        actualOutcome: formData.actualOutcome,
        lessonsLearned: formData.lessonsLearned,
        privateNotes: formData.privateNotes,
        satisfaction: formData.satisfaction
      };

      await updateMutation.mutateAsync({ id: decisionId, data: command });

      if (shouldPublish) {
        await publishMutation.mutateAsync({ id: decisionId });
      }

      await queryClient.invalidateQueries({
        queryKey: getGetApiDecisionsIdQueryKey(decisionId)
      });

      queryClient.invalidateQueries({ queryKey: ['decisions'] });
    } catch (err) {
      console.error("Failed to update/publish", err);
    }
  };

  const displayError = () => {
    if (error) return getErrorMessage(error);
    if (updateMutation.isError) return getErrorMessage(updateMutation.error, t.reflection.errors.updateFailed);
    if (publishMutation.isError) return getErrorMessage(publishMutation.error, t.reflection.errors.updateFailed);
    return null;
  }

  if (isLoading) return <div className="p-8 text-center">{t.common.loading}</div>;
  if (error) return <Alert message={displayError()} />;
  if (!data) return <div className="p-8 text-center">{t.reflection.errors.missingDecision}</div>;

  const isReadOnly = data.status === DecisionStatus.Reflected;

  return (
    <PageContainer className="max-w-4xl">
      <ReflectionHeader decision={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Phase1 decision={data} />

        {isReadOnly ? (
          <Phase2Result decision={data} />
        ) : (
          <Phase2Form
            status={data.status}
            visibility={data.visibility}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default ReflectionPage;
