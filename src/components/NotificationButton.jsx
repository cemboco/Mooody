import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button"

const NotificationButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black shadow-lg rounded-full p-3 flex items-center space-x-2"
    >
      <Bell className="h-5 w-5" />
      <span>Wie fühlst du dich gerade?</span>
    </Button>
  );
};

export default NotificationButton;
