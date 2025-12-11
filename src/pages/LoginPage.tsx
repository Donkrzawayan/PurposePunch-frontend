import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { t } from '../textResources';
import { FormField } from '../components/common/FormField';
import { getErrorMessage } from '../utils/errorUtils';
import { AuthLayout } from '../components/layout/AuthLayout';

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
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err, t.login.error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={`${t.login.loginTo} ${t.common.name}`}
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonText={t.login.loginButton}
      footerLinkText={t.login.registerLink}
      footerLinkTo="/register"
    >
      <FormField
        id="email" label={t.login.email} required labelClassName="font-bold"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.login.emailPlaceholder}
      />

      <FormField
        id="password" label={t.login.password} required labelClassName="font-bold"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t.login.passwordPlaceholder}
      />
    </AuthLayout>
  );
};

export default LoginPage;
