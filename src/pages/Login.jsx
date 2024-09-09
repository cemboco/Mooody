import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://mypxifpqgzyhhecibskk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15cHhpZnBxZ3p5aGhlY2lic2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTM4ODYsImV4cCI6MjA0MTM4OTg4Nn0.6h8ABP7_V4FAap0RJOC9-QxyqDtRgwDYblmkDtLef4c');

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      console.log('Sign up successful:', data);
      onLogin();
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw error;
      console.log('Sign in successful:', data);
      onLogin();
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
      onLogin();
      navigate('/home');
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.login}</h1>
        <form className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email || "Email"}
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            required
          />
          <Button onClick={handleSignIn} className="w-full">
            {t.loginButton}
          </Button>
          <Button onClick={handleSignUp} className="w-full">
            {t.signUpButton || "Sign Up"}
          </Button>
        </form>
        <div className="mt-4">
          <Button onClick={loginWithGoogle} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            {t.loginWithGoogle || 'Login with Google'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;