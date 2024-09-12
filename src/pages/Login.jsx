import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { supabase } from '../integrations/supabase/supabase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const { login } = useAuth();

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
        setError(t.checkEmailForLink);
      } else {
        login(); // Update the auth context
        navigate('/confirmation-mood');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isSignUp ? t.signUp : t.login}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full bg-mooody-green hover:bg-mooody-dark-green text-white" disabled={loading}>
            {loading ? t.loading : (isSignUp ? t.signUpButton : t.loginButton)}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
          <Button variant="link" onClick={toggleAuthMode} className="p-0">
            {isSignUp ? t.login : t.signUp}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;