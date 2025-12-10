import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';

interface AuthLayoutProps {
  title: React.ReactNode;
  error: string | null;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  footerLinkText: string;
  footerLinkTo: string;
  children: React.ReactNode;
}

export const AuthLayout = ({
  title,
  error,
  isSubmitting,
  onSubmit,
  submitButtonText,
  footerLinkText,
  footerLinkTo,
  children
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="shadow-md w-full max-w-md border-transparent">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>

        <Alert message={error} />

        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {children}
          </div>

          <div className="w-full flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {submitButtonText}
            </Button>

            <Link
              to={footerLinkTo}
              className="text-center font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors"
            >
              {footerLinkText}
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
