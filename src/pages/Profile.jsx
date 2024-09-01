import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-moody flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">{t.profileTitle}</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t.nameLabel}</label>
            <Input type="text" id="name" placeholder={t.namePlaceholder} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.emailLabel}</label>
            <Input type="email" id="email" placeholder={t.emailPlaceholder} />
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">{t.languageLabel}</label>
            <select id="language" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </div>
          <Button type="submit" className="w-full">{t.saveProfile}</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;