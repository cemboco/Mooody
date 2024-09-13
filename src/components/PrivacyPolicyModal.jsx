import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.privacyPolicy || 'Privacy Policy'}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="text-2xl font-bold mb-4">Privacy Policy for Mooody</h1>
          <p className="mb-4">Last updated: 13 september 2024</p>
          <p className="mb-4">This Privacy Policy describes how we collect, use, and protect your personal data when you use our Mooody app ("the App"). Please read this policy carefully.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Information Collected</h2>
          <p>We collect the following types of information:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Personal Data</strong>: Email address, username</li>
            <li><strong>Usage Data</strong>: Interactions with the App, mood entries, usage statistics</li>
            <li><strong>Device Information</strong>: Device type, operating system, app version</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Your Data</h2>
          <p>We use your data solely for the following purposes:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Providing and improving App functions</li>
            <li>Personalizing your App experience</li>
            <li>Analyzing App usage to improve our service</li>
            <li>Communicating with you regarding App updates or support</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Storage and Security</h2>
          <p className="mb-4">Your data is securely stored on servers in [Country/Region]. We implement appropriate technical and organizational measures to protect your data.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
          <p className="mb-4">We do not share your personal data with third parties unless:</p>
          <ul className="list-disc list-inside mb-4">
            <li>You have explicitly consented</li>
            <li>It is legally required</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access your data</li>
            <li>Correct your data</li>
            <li>Delete your data</li>
            <li>Object to the processing of your data</li>
            <li>Export your data</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
          <p className="mb-4">We may occasionally update this Privacy Policy. We will inform you about significant changes.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
          <p className="mb-4">If you have questions about this Privacy Policy, please contact us at: cemilbocohonsi@duck.com</p>

          <p className="mt-6">By using the Mooody App, you agree to this Privacy Policy.</p>
        </DialogDescription>
        <Button onClick={onClose} className="mt-4">{t.close || 'Close'}</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;