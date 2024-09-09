import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const { signInWithGoogle, user } = useSupabaseAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.login}</h1>
        <Button onClick={handleGoogleLogin} className="w-full mb-4">
          {t.loginWithGoogle}
        </Button>
      </div>
    </div>
  );
};

export default Login;