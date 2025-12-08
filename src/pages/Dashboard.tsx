import { useEffect, useState } from 'react';
import { decisionService } from '../api/services';
import { DecisionStatus, type DecisionDto } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PageContainer } from '../components/layout/PageContainer';

const Dashboard = () => {
  const navigate = useNavigate();
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
    <PageContainer>
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{t.dashboard.title}</h1>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/create')}
        >
          {t.dashboard.addDecision}
        </Button>
      </div>

      {decisions.length === 0 ? (
        <Card className="text-center">
          <p className="text-gray-500 mb-4">{t.dashboard.noneDecision}</p>
          <Link to="/create" className="text-blue-600 font-bold hover:underline">
            {t.dashboard.addFirst}
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decisions.map((decision) => (
            <Card key={decision.id} className="hover:shadow-md relative">
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
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Dashboard;
