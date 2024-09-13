import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/supabase';

const AccountSettings = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (window.confirm(t.confirmDeleteAccount)) {
      setIsDeleting(true);
      setError(null);
      try {
        const { error } = await supabase.rpc('delete_user_data');
        if (error) throw error;
        await logout();
        setSuccess(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t.accountSettings}</h2>
      {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
      {success && <Alert className="mb-4"><AlertDescription>{t.accountDeletedSuccess}</AlertDescription></Alert>}
      <Button
        onClick={handleDeleteAccount}
        variant="destructive"
        disabled={isDeleting}
        className="w-full"
      >
        {isDeleting ? t.deletingAccount : t.deleteAccount}
      </Button>
    </div>
  );
};

export default AccountSettings;