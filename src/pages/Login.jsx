import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert(t.checkEmailForLoginLink);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/home'
        }
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: window.location.origin + '/home'
        }
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.signUp}</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            {t.signUpButton}
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          <Button onClick={handleGoogleSignIn} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            {t.signInWithGoogle}
          </Button>
          <Button onClick={handleAppleSignIn} className="w-full bg-black hover:bg-gray-800 text-white">
            {t.signInWithApple}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;