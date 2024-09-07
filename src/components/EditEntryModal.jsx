import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const EditEntryModal = ({ isOpen, onClose, onSave, entries, date }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [editedEntries, setEditedEntries] = useState(entries);

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...editedEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEditedEntries(updatedEntries);
  };

  const handleSave = () => {
    onSave(editedEntries);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.editEntry} - {date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</DialogTitle>
        </DialogHeader>
        {editedEntries.map((entry, index) => (
          <div key={index} className="mb-4">
            <Input
              value={entry.emotion}
              onChange={(e) => handleInputChange(index, 'emotion', e.target.value)}
              placeholder={t.emotion}
              className="mb-2"
            />
            <Input
              value={entry.text}
              onChange={(e) => handleInputChange(index, 'text', e.target.value)}
              placeholder={t.entryText}
            />
          </div>
        ))}
        <Button onClick={handleSave}>{t.save}</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditEntryModal;