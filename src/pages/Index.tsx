
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [username, setUsername] = useState<string | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check for existing session
  useEffect(() => {
    const savedUsername = localStorage.getItem("studyBuddyUsername");
    const savedOnboarding = localStorage.getItem("studyBuddyOnboarded");
    const savedDarkMode = localStorage.getItem("studyBuddyDarkMode");
    
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    if (savedOnboarding === "true") {
      setOnboardingComplete(true);
    }
    
    if (savedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("studyBuddyDarkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("studyBuddyDarkMode", "false");
    }
  }, [darkMode]);

  const handleOnboardingComplete = (name: string) => {
    setUsername(name);
    setOnboardingComplete(true);
    localStorage.setItem("studyBuddyUsername", name);
    localStorage.setItem("studyBuddyOnboarded", "true");
    
    toast({
      title: "Welcome to Study Buddy!",
      description: `Hi ${name}, your AI study companion is ready to help you succeed.`,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        username={username} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <main className="flex-grow">
        {onboardingComplete ? (
          <Dashboard username={username!} isMobile={isMobile} />
        ) : (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
