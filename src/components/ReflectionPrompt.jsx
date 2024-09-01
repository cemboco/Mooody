import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const ReflectionPrompt = ({ onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [reflection, setReflection] = useState('');

  const handleSubmit = () => {
    if (reflection.trim()) {
      onComplete(reflection);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t.reflectionPrompt}</h3>
      <Textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={t.reflectionPlaceholder}
        rows={4}
      />
      <Button onClick={handleSubmit}>{t.submitReflection}</Button>
    </div>
  );
};

export default ReflectionPrompt;