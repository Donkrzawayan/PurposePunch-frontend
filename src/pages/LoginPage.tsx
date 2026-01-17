import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { t } from '../textResources';
import { FormField } from '../components/common/FormField';
import { AuthLayout } from '../components/layout/AuthLayout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoggingIn, loginError, isAuthenticated, clearErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
    } catch {}
  };

  return (
    <AuthLayout
      title={`${t.login.loginTo} ${t.common.name}`}
      error={loginError}
      isSubmitting={isLoggingIn}
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
