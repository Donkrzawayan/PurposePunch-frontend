import { Link } from "react-router-dom";
import { DecisionStatus, type DecisionDto } from "../../types";
import { Card } from "../common/Card";
import { StatusBadge } from "../common/StatusBadge";
import { t } from "../../textResources";

interface Props {
  decision: DecisionDto;
}

export const DecisionCard = ({ decision }: Props) => {
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

  return (
    <Card className="hover:shadow-md relative">
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
  );
};
