import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

import LogoImage from '../../../components/LogoImage/LogoImage';
import PasswordField from '../../../components/PasswordField/PasswordField';
import InputField from '../../../components/InputField/InputField';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import LangSelector from '../../../components/LangSelector/LangSelector';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Link from '../../../components/Link/Link';
import { registerUser } from '../../../services/users';

export default function RegisterForm() {
  const { t, i18n } = useTranslation();

  const [userId, setUserId] = useState('');
  const [parrainLink, setParrainLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  // Schéma dynamique qui dépend de la langue
  const schema = useMemo(() => {
    return yup.object().shape({
      phone: yup
        .string()
        .required(t('phoneRequired'))
        .matches(/^\+\d+$/, t('phoneFormat'))
        .min(9, t('phoneShort')),
      password: yup
        .string()
        .required(t('passwordRequired'))
        .min(6, t('passwordMin'))
        .matches(/[A-Z]/, t('passwordUppercase'))
        .matches(/[a-z]/, t('passwordLowercase'))
        .matches(/\d/, t('passwordDigit'))
        .matches(/[@$!%*?&.]/, t('passwordSpecial')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('passwordMatch'))
        .required(t('confirmPasswordRequired')),
      invitationCode: yup.string().nullable().notRequired()
    });
  }, [t, i18n.language]); // Recrée le schéma si la langue change

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  // Forcer la mise à jour des erreurs avec la nouvelle langue
  useEffect(() => {
    reset(watch()); // On conserve les valeurs
  }, [i18n.language]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setValue('invitationCode', ref);
    }
  }, [setValue]);

  useEffect(() => {
    const phone = watch('phone');
    if (phone && phone.length >= 6) {
      const lastSix = phone.slice(-6).replace(/\D/g, '');
      const id = `USR_${lastSix}`;
      setUserId(id);
      setParrainLink(`${window.location.origin}/register?ref=${id}`);
    }
  }, [watch('phone')]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage(null);
    setError(null);
  
    try {
      const apiData = {
        phone: data.phone,
        password: data.password,
        invitation_code: data.invitationCode || null,
        user_id: userId,
      };
  
      const result = await registerUser(apiData);
  
      setMessage(t('registerSuccess'));
      reset();
    } catch (err) {
      console.error(err);
  
      // Utiliser directement le code retourné par l'API
      let errorKey = 'registerFailed';
  
      if (err.code) {
        // Exemple : USER_ALREADY_EXISTS, INVALID_INVITATION_CODE, VALIDATION_ERROR
        errorKey = err.code;
      }
  
      setError(t(errorKey));
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Effacer le message ou l'erreur après 10 secondes
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 10000); // 10 secondes

      return () => clearTimeout(timer); // Nettoyage si le composant est démonté ou si le message change
    }
  }, [message, error]);


  return (
    <div
      style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'roboto' }}
      className="container justify-content-center "
    >
      <div style={{position:'sticky', top:'0px', backgroundColor:'#ffffff'}} className="container d-flex justify-content-between align-items-center">
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
        <SectionTitle text={t('register')} color='#006B76' align='center' />

        <InputField
          id="phone"
          label={t('phone')}
          placeholder="+237 699 00 00 00"
          register={register}
          error={errors.phone}
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

        <PasswordField
          id="confirmPassword"
          label={t('confirmPassword')}
          placeholder={t('confirmPassword')}
          register={register}
          error={errors.confirmPassword}
        />

        <InputField
          id="invitationCode"
          label={t('invitationCode')}
          placeholder={t('invitationCode')}
          register={register}
          error={errors.invitationCode}
        />

        {userId && (
          <div className="mb-3 text-secondary small" style={{ color: '#666666' }}>
           
          </div>
        )}
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <br />
        <SubmitButton label={t('register')} disabled={!isValid} loading={isSubmitting} />
        <br />
        <Link
            message={t('alreadyAccount')}
            linkLabel={t('login')}
            linkPath="/login"
        />
        <SectionTitle text={t('downloadapp')} size='14px' color='#006B76' align='left' />

        <p className="text-muted small mt-3">{t('passwordNotice')}</p>
        <p className="text-muted small">{t('invitationNotice')}</p>
      </form>
    </div>
  );
}
