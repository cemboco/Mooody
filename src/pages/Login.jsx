import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import AuthForm from '../components/AuthForm';
import { signInWithGoogle } from '../utils/auth';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (credentials) => {
    // Here you would typically send the credentials to your backend
    console.log('Credentials submitted:', credentials);
    onLogin();
    navigate('/home');
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onLogin();
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? t.createAccount : t.signInToAccount}
        </h1>
        <AuthForm isSignUp={isSignUp} onSubmit={handleSubmit} />
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
            {t.signInWithGoogle}
          </Button>
        </div>
        <p className="mt-4 text-center">
          {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? t.signIn : t.signUp}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;