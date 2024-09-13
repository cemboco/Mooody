import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { supabase } from '../integrations/supabase/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import MoodBalls from '../components/MoodBalls';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || {};
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        login();
        navigate('/confirmation-mood');
      }
    };
    checkSession();
  }, [login, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/confirmation-mood');
    }
  }, [isLoggedIn, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email: email,
          password: password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
      }
      if (result.error) throw result.error;
      if (isSignUp) {
        setSuccessMessage(t.checkEmailForLink);
      } else {
        login();
        navigate('/confirmation-mood');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccessMessage(t.resetPasswordEmailSent);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setIsResetPassword(false);
    setError(null);
    setSuccessMessage(null);
  };

  const toggleResetPassword = () => {
    setIsResetPassword(!isResetPassword);
    setError(null);
    setSuccessMessage(null);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <MoodBalls showText={false} />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isResetPassword ? t.resetPassword : (isSignUp ? t.signUp : t.login)}
        </h2>
        {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        {successMessage && <Alert className="mb-4"><AlertDescription>{successMessage}</AlertDescription></Alert>}
        <form onSubmit={isResetPassword ? handleResetPassword : handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          {!isResetPassword && (
            <Input
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          )}
          <Button type="submit" className="w-full bg-mooody-green hover:bg-mooody-dark-green text-white" disabled={loading}>
            {loading ? t.loading : (isResetPassword ? t.sendResetLink : (isSignUp ? t.signUpButton : t.loginButton))}
          </Button>
        </form>
        {!isResetPassword && (
          <p className="mt-4 text-center">
            {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
            <Button variant="link" onClick={toggleAuthMode} className="p-0">
              {isSignUp ? t.login : t.signUp}
            </Button>
          </p>
        )}
        {!isSignUp && !isResetPassword && (
          <p className="mt-2 text-center">
            <Button variant="link" onClick={toggleResetPassword} className="p-0 text-black">
              {t.forgotPassword}
            </Button>
          </p>
        )}
        {isResetPassword && (
          <p className="mt-4 text-center">
            <Button variant="link" onClick={toggleResetPassword} className="p-0">
              {t.backToLogin}
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
