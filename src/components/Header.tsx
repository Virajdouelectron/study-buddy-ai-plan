
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  username: string | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ username, darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-study-primary text-white flex items-center justify-center">
            <span className="font-bold">SB</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-study-primary to-study-secondary text-transparent bg-clip-text">
            Study Buddy
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {username && (
            <div className="hidden sm:block text-sm">
              <span className="text-muted-foreground">Hello, </span>
              <span className="font-medium">{username}</span>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
