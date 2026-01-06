import { SatisfactionScale } from '../api/generated/model';
import { t } from '../textResources';

export const SATISFACTION_ORDER = [
  SatisfactionScale.VeryDissatisfied,
  SatisfactionScale.SlightlyDissatisfied,
  SatisfactionScale.NeitherSatisfiedNorDissatisfied,
  SatisfactionScale.SlightlySatisfied,
  SatisfactionScale.VerySatisfied,
] as const;

export const getSatisfactionIndex = (scale: SatisfactionScale | null | undefined): number => {
  if (!scale) return -1;
  return SATISFACTION_ORDER.indexOf(scale);
};

export const getSatisfactionEmoji = (scale: SatisfactionScale | null | undefined): string => {
  const index = getSatisfactionIndex(scale);
  if (index === -1) return "";
  return t.reflection.satisfaction.emojis[index] ?? "";
};

export const getSatisfactionLabel = (scale: SatisfactionScale | null | undefined): string => {
  const index = getSatisfactionIndex(scale);
  if (index === -1) return t.reflection.phase2.satisfactionPlaceholder;

  return (t.reflection.satisfaction as any)[index] ?? "";
};
