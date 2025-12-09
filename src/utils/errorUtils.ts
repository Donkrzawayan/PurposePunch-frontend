import axios from 'axios';
import type { ProblemDetails } from '../types';
import { t } from '../textResources';

export const getErrorMessage = (error: unknown, fallbackMessage: string = "Operation failed"): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const problem = error.response.data as ProblemDetails;

      if (problem.errors && Object.keys(problem.errors).length > 0) {
        return Object.values(problem.errors).flat().join('\n');
      }

      return problem.detail || problem.title || fallbackMessage;
    }
    return t.common.networkError;
  }

  return fallbackMessage;
};
