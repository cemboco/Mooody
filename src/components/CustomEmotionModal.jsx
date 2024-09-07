import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const CustomEmotionModal = ({ isOpen, onClose, onAdd }) => {
  const [customEmotion, setCustomEmotion] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customEmotion.trim()) {
      onAdd(customEmotion.trim());
      setCustomEmotion('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.addCustomEmotion}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            placeholder={t.enterCustomEmotion}
          />
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t.cancel}
            </Button>
            <Button type="submit">{t.add}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomEmotionModal;