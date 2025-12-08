import { useEffect, useState } from 'react';
import { decisionService } from '../api/services';
import { DecisionStatus, type DecisionDto } from '../types';
import { Link } from 'react-router-dom';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';
import { StatusBadge } from '../components/common/StatusBadge';

const Dashboard = () => {
  const [decisions, setDecisions] = useState<DecisionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const data = await decisionService.getAll();
        setDecisions(data);
      } catch (err) {
        setError(getErrorMessage(err, t.dashboard.error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecisions();
  }, []);

  const getOngoingDate = (status: DecisionStatus, expectedReflectionDate: string, reflectedAt: string | null) => {
    if (status === DecisionStatus.Reflected && reflectedAt) {
      return (
        <> {t.dashboard.reflected} {new Date(reflectedAt).toLocaleDateString()} </>
      );
    }
    return (
      <> {t.dashboard.expected} {new Date(expectedReflectionDate).toLocaleDateString()} </>
    );
  };


  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">{t.common.loading}</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{t.dashboard.title}</h1>
        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {t.dashboard.addDecision}
        </Link>
      </div>

      {decisions.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">{t.dashboard.noneDecision}</p>
          <Link to="/create" className="text-blue-600 font-bold hover:underline">
            {t.dashboard.addFirst}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decisions.map((decision) => (
            <div key={decision.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{decision.title}</h3>
                <StatusBadge status={decision.status} className="text-xs" />
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {decision.description}
              </p>

              <div className="flex justify-between items-end mt-4">
                <div className="text-xs text-gray-400">
                  {getOngoingDate(decision.status, decision.expectedReflectionDate, decision.reflectedAt)}
                </div>

                <Link to={`/decision/${decision.id}`} className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  {t.dashboard.detailsLink}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
