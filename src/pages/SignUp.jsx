import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const SignUp = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green p-4">
      <h1 className="text-3xl font-bold mb-6">{t.signUp}</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <SupabaseAuthUI />
      </div>
      <Button
        onClick={() => navigate('/')}
        className="mt-4"
        variant="outline"
      >
        {t.backToHome}
      </Button>
    </div>
  );
};

export default SignUp;