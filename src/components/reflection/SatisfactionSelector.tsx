import { useState } from 'react';
import { SatisfactionScale } from '../../types';
import { t } from '../../textResources';
import { cn } from '../../utils/cn';

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
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const renderText = (level: number | null) => {
    if (level === null) return t.reflection.phase2.satisfactionPlaceholder;
    return t.reflection.satisfaction[level as keyof typeof t.reflection.satisfaction] || level;
  };

  const currentDisplayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className={cn(
        "flex flex-col items-center p-4 rounded-lg border transition-colors",
        error
          ? "border-red-300 ring-1 ring-red-300 bg-red-50"
          : "border-gray-100 bg-gray-50"
      )}>

        <div className="flex justify-between w-full text-xs text-gray-400 mb-2 px-1">
          <span>{t.reflection.satisfaction[SatisfactionScale.VeryDissatisfied]}</span>
          <span>{t.reflection.satisfaction[SatisfactionScale.VerySatisfied]}</span>
        </div>

        <div className="flex gap-2 mb-2">
          {Object.values(SatisfactionScale).filter(v => typeof v === 'number').map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star as SatisfactionScale)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(null)}
              className={cn(
                "text-3xl transition-transform hover:scale-110 focus:outline-none",
                (currentDisplayValue !== null && star <= currentDisplayValue)
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
          currentDisplayValue === null ? "text-gray-400 italic" : "text-blue-600"
        )}>
          {renderText(currentDisplayValue)}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1 font-medium animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};
