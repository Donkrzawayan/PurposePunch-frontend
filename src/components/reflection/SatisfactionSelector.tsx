import { useState } from 'react';
import type { SatisfactionScale } from '../../api/generated/model';
import { t } from '../../textResources';
import { cn } from '../../utils/cn';
import { FieldLabel, FieldMessage } from '../common/FormElements';
import { getSatisfactionIndex, getSatisfactionLabel, SATISFACTION_ORDER } from '../../utils/satisfactionUtils';

interface Props {
  value: SatisfactionScale | null;
  onChange: (value: SatisfactionScale) => void;
  error?: string | null;
  label?: string;
  required?: boolean;
}

export const SatisfactionSelector = ({
  value,
  onChange,
  error,
  label = t.reflection.phase2.satisfactionLabel,
  required = false
}: Props) => {
  const [hoverValue, setHoverValue] = useState<SatisfactionScale | null>(null);

  const displayValue = hoverValue ?? value;
  const displayIndex = getSatisfactionIndex(displayValue);

  return (
    <div className="mb-4">
      <FieldLabel required={required}>
        {label}
      </FieldLabel>

      <div className={cn(
        "flex flex-col items-center p-4 rounded-lg border transition-colors",
        error
          ? "border-red-300 ring-1 ring-red-300 bg-red-50"
          : "border-gray-100 bg-gray-50"
      )}>

        <div className="flex justify-between w-full text-xs text-gray-400 mb-2 px-1">
          <span>{getSatisfactionLabel(SATISFACTION_ORDER[0])}</span>
          <span>{getSatisfactionLabel(SATISFACTION_ORDER[SATISFACTION_ORDER.length - 1])}</span>
        </div>

        <div className="flex gap-2 mb-2">
          {SATISFACTION_ORDER.map((level, index) => (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              onMouseEnter={() => setHoverValue(level)}
              onMouseLeave={() => setHoverValue(null)}
              className={cn(
                "text-3xl transition-transform hover:scale-110 focus:outline-none",
                (index <= displayIndex)
                  ? "text-yellow-400 drop-shadow-sm"
                  : "text-gray-300"
              )}
            >
              {t.reflection.satisfaction.star}
            </button>
          ))}
        </div>

        <div className={cn(
          "h-5 text-sm font-bold transition-colors",
          displayIndex === -1 ? "text-gray-400 italic" : "text-blue-600"
        )}>
          {getSatisfactionLabel(displayValue)}
        </div>
      </div>

      <FieldMessage error={error} />
    </div>
  );
};
