import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { t } from '../textResources';
import { FormField } from '../components/common/FormField';
import { getErrorMessage } from '../utils/errorUtils';
import { Button } from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err, t.login.error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {t.login.loginTo} {t.common.name}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            id="email" label={t.login.email} required className="border-gray-700" labelClassName="font-bold"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.login.emailPlaceholder}
          />

          <FormField
            id="password" label={t.login.password} required className="border-gray-700" labelClassName="font-bold"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.login.passwordPlaceholder}
          />

          <div className="w-full flex justify-between flex-col gap-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              loadingText={t.login.loggingIn}
            >
              {t.login.loginButton}
            </Button>

            <Link
              to="/register"
              className="text-center font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {t.login.registerLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
