import { HomeIcon, UserPlus } from "lucide-react";
import Index from "./pages/Index.jsx";
import SignUp from "./pages/SignUp.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Sign Up",
    to: "/signup",
    icon: <UserPlus className="h-4 w-4" />,
    page: <SignUp />,
  },
];
