import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';

const GratitudeLog = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEntries = localStorage.getItem('gratitudeEntries');
    if (storedEntries) {
      setGratitudeEntries(JSON.parse(storedEntries));
    }
  }, []);

  const addEntry = () => {
    if (newEntry.trim()) {
      const updatedEntries = [...gratitudeEntries, { text: newEntry, date: new Date().toISOString() }];
      setGratitudeEntries(updatedEntries);
      localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
      setNewEntry('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(gratitudeEntries[index].text);
  };

  const saveEdit = (index) => {
    const updatedEntries = [...gratitudeEntries];
    updatedEntries[index].text = editText;
    setGratitudeEntries(updatedEntries);
    localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center p-4" style={{ backgroundImage: "url('/Bg.png')" }}>
      <div className="max-w-md mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.backButton}
        </Button>
        <h2 className="text-2xl font-bold mb-4">{t.gratitudeLogTitle}</h2>
        <div className="mb-4">
          <Input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder={t.gratitudeEntryPlaceholder}
            className="mb-2"
          />
          <Button onClick={addEntry} className="w-full rounded-full">{t.addGratitudeEntry}</Button>
        </div>
        <ul className="space-y-2">
          {gratitudeEntries.map((entry, index) => (
            <li key={index} className="bg-white p-2 rounded shadow flex justify-between items-center">
              {editingIndex === index ? (
                <>
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="mr-2"
                  />
                  <div>
                    <Button onClick={() => saveEdit(index)} className="mr-2" size="sm"><Save className="h-4 w-4" /></Button>
                    <Button onClick={cancelEdit} variant="outline" size="sm"><X className="h-4 w-4" /></Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p>{entry.text}</p>
                    <small className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</small>
                  </div>
                  <Button onClick={() => startEditing(index)} variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GratitudeLog;