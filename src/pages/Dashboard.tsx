import { useEffect, useState } from 'react';
import { decisionService } from '../api/services';
import { type DecisionDto } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PageContainer } from '../components/layout/PageContainer';
import { Alert } from '../components/common/Alert';
import { DecisionCard } from '../components/decision/DecisionCard';

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

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">{t.common.loading}</div>;
  }

  if (error) {
    return <Alert message={error} />;
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
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Dashboard;
