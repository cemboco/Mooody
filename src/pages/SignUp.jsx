import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert(t.checkEmailForLink);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-mooody-green">
      <LanguageToggle />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t.signUp}</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            type="email"
            placeholder={t.yourEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder={t.yourPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full bg-mooody-green hover:bg-mooody-dark-green text-white">
            {t.signUp}
          </Button>
        </form>
      </div>
    </div>
  );
}