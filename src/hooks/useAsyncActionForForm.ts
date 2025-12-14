import { useState, useCallback } from 'react';
import { getErrorMessage } from '../utils/errorUtils';

export const useAsyncActionForForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (action: () => Promise<void>, fallbackErrorMessage?: string) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await action();
      return true;
    } catch (err) {
      setError(getErrorMessage(err, fallbackErrorMessage));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    error,
    setError,
    execute
  };
};
