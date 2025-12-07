import { type DecisionDto, DecisionStatus, Visibility } from '../../types';
import { t } from '../../textResources';

interface Props {
  decision: DecisionDto;
}

export const ReflectionHeader = ({ decision }: Props) => {
  const getStatusBadgeColor = (status: DecisionStatus) => {
    switch (status) {
      case DecisionStatus.Reflected: return 'bg-green-100 text-green-800';
      case DecisionStatus.Abandoned: return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: DecisionStatus) => {
    switch (status) {
      case DecisionStatus.Reflected: return t.decision.status.reflected;
      case DecisionStatus.Abandoned: return t.decision.status.abandoned;
      default: return t.decision.status.active;
    }
  };

  const getVisibilityBadge = (vis: Visibility) => {
    if (vis === Visibility.Public) {
      return <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full ml-2 border border-purple-200">{t.decision.visibility.public}</span>;
    }
    return <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 border border-gray-200">{t.decision.visibility.private}</span>;
  };

  return (
    <div className="border-b pb-4 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{decision.title}</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(decision.status)}`}>
            {getStatusText(decision.status)}
          </span>
          {getVisibilityBadge(decision.visibility)}
        </div>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>{t.decision.expectedReflectionDate}:</p>
        <p className="font-medium">{new Date(decision.expectedReflectionDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
