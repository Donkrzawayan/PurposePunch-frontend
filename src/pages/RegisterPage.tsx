import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components/common/FormField';
import { t } from '../textResources';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAsyncActionForForm } from '../hooks/useAsyncActionForForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { isSubmitting, error, setError, execute } = useAsyncActionForForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t.register.errors.passwordMismatch);
      return;
    }

    await execute(
      async () => {
        await register({ email, password });
        navigate('/login');
      },
      t.register.errors.failed
    );
  };

  return (
    <AuthLayout
      title={t.register.title}
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonText={t.register.submitButton}
      footerLinkText={t.register.loginLink}
      footerLinkTo="/login"
    >
      <FormField
        label={t.login.email} required labelClassName="font-bold"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.login.emailPlaceholder}
      />

      <FormField
        label={t.login.password} required labelClassName="font-bold"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t.register.passwordPlaceholder}
      />

      <FormField
        label={t.register.confirmPassword} required labelClassName="font-bold"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={t.register.confirmPasswordPlaceholder}
        error={confirmPassword && password !== confirmPassword ? error : null}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
