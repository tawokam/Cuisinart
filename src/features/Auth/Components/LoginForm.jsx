import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import LogoImage from '../../../components/LogoImage/LogoImage';
import PasswordField from '../../../components/PasswordField/PasswordField';
import InputField from '../../../components/InputField/InputField';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import LangSelector from '../../../components/LangSelector/LangSelector';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Link from '../../../components/Link/Link';

import { loginUser } from '../../../services/users';

export default function LoginForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const schema = useMemo(() => {
    return yup.object().shape({
      phone: yup
        .string()
        .required(t('phoneRequired'))
        .matches(/^\+\d{6,}$/, t('phoneFormat')),
      password: yup
        .string()
        .required(t('passwordRequired'))
        .min(6, t('passwordMin'))
        .matches(/[A-Z]/, t('passwordUppercase'))
        .matches(/[a-z]/, t('passwordLowercase'))
        .matches(/\d/, t('passwordDigit'))
        .matches(/[@$!%*?&.]/, t('passwordSpecial'))
    });
  }, [t, i18n.language]);

  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    reset(watch());
  }, [i18n.language]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);
  
    try {
      const result = await loginUser(data);
      localStorage.setItem('Token', result.token);
      setMessage(t('loginSuccess'));
  
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error(err);
  
      // Utiliser directement le code retourné par l'API
      let errorKey = 'loginFailed';
  
      if (err.code) {
        // Ex : AUTH_FAILED, USER_ALREADY_EXISTS, etc.
        errorKey = err.code;
      }
  
      setError(t(errorKey));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <div
      style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'roboto' }}
      className="container justify-content-center"
    >
      <div style={{ position: 'sticky', top: '0px', backgroundColor: '#ffffff' }} className="container d-flex justify-content-between align-items-center">
        <span><LogoImage maxWidth='40px' /></span>
        <span className='m-2'><LangSelector /></span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '95vw',
          maxWidth: '600px',
          backgroundColor: '#f5f5f5',
          borderRadius: 20,
          padding: '20px',
        }}
        noValidate
      >
        <SectionTitle text={t('login')} color='#006B76' align='center' />

        <InputField
          id="phone"
          label={t('phone')}
          placeholder="+237 699 00 00 00"
          register={register}
          error={errors.phone}
          type="text"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^+\d]/g, '');
          }}
        />

        <PasswordField
          id="password"
          label={t('password')}
          placeholder={t('password')}
          register={register}
          error={errors.password}
        />

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <br />

        <SubmitButton label={t('login')} disabled={!isValid || isSubmitting} loading={isSubmitting} />
        <Link
          message={t('noAccount')}
          linkLabel={t('createAccount')}
          linkPath="/register"
        />
        <br />
        <SectionTitle text={t('downloadapp')} size='14px' color='#006B76' align='left' />
      </form>
    </div>
  );
}
