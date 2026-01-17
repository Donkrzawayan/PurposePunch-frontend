import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components/common/FormField';
import { t } from '../textResources';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, isRegistering, registerError, clearErrors } = useAuth();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError(t.register.errors.passwordMismatch);
      return;
    }

    try {
      await register({ email, password });
      navigate('/login');
    } catch { }
  };

  const displayError = validationError || registerError;

  return (
    <AuthLayout
      title={t.register.title}
      error={displayError}
      isSubmitting={isRegistering}
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
        error={confirmPassword && password !== confirmPassword ? validationError : null}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
