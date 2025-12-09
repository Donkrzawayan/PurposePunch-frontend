import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/services';
import type { RegisterCommand } from '../types';
import { FormField } from '../components/common/FormField';
import { Button } from '../components/common/Button';
import { t } from '../textResources';
import { getErrorMessage } from '../utils/errorUtils';
import { Card } from '../components/common/Card';
import { Alert } from '../components/common/Alert';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t.register.errors.passwordMismatch);
      return;
    }

    setIsSubmitting(true);

    try {
      const command: RegisterCommand = {
        email,
        password
      };

      await authService.register(command);

      navigate('/login');

    } catch (err) {
      setError(getErrorMessage(err, t.register.errors.failed));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {t.register.title}
        </h2>

        <Alert message={error} />

        <form onSubmit={handleSubmit}>

          <FormField label={t.login.email} required labelClassName="font-bold"
            id="email"
            type="email"
            placeholder={t.login.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormField label={t.login.password} required labelClassName="font-bold"
            id="password"
            type="password"
            placeholder={t.register.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormField label={t.register.confirmPassword} required labelClassName="font-bold"
            id="confirmPassword"
            type="password"
            placeholder={t.register.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword && password !== confirmPassword ? error : null}
          />

          <div className="w-full flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              {t.register.submitButton}
            </Button>

            <Link
              to="/login"
              className="text-center font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors"
            >
              {t.register.loginLink}
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
