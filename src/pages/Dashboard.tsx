import { useEffect, useState } from 'react';
import { decisionService } from '../api/services';
import { DecisionStatus, type DecisionDto } from '../types';
import { Link } from 'react-router-dom';

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
        console.error(err);
        setError('Failed to load decisions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecisions();
  }, []);

  const getStatusBadge = (status: DecisionStatus) => {
    switch (status) {
      case DecisionStatus.Reflected:
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Reflected
          </span>
        );
      case DecisionStatus.Abandoned:
        return (
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
            Abandoned
          </span>
        );
      case DecisionStatus.Active:
      default:
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            Active
          </span>
        );
    }
  };

  const getOngoingDate = (status: DecisionStatus, expectedReflectionDate: string, reflectedAt: string | null) => {
    if (status === DecisionStatus.Reflected && reflectedAt) {
      return (
        <> Reflected: {new Date(reflectedAt).toLocaleDateString()} </>
      );
    }
    return (
      <> Expected: {new Date(expectedReflectionDate).toLocaleDateString()} </>
    );
  };


  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading your decisions...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Decisions</h1>
        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + New Decision
        </Link>
      </div>

      {decisions.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">You haven't added any decisions yet.</p>
          <Link to="/create" className="text-blue-600 font-bold hover:underline">
            Make your first decision!
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decisions.map((decision) => (
            <div key={decision.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{decision.title}</h3>
                {getStatusBadge(decision.status)}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {decision.description}
              </p>

              <div className="flex justify-between items-end mt-4">
                <div className="text-xs text-gray-400">
                  {getOngoingDate(decision.status, decision.expectedReflectionDate, decision.reflectedAt)}
                </div>

                <Link to={`/decision/${decision.id}`} className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Details &rarr;
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
