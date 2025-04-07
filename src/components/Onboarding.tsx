
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, UserCircle, CalendarClock, FolderUp, ClipboardList } from "lucide-react";
import TimetableUpload from "./TimetableUpload";
import PreferencesForm from "./PreferencesForm";
import AttendanceForm from "./AttendanceForm";

interface OnboardingProps {
  onComplete: (username: string) => void;
}

const getRandomUsername = () => {
  const adjectives = ["Bright", "Clever", "Diligent", "Eager", "Focused", "Genius", "Hardworking", "Inspired"];
  const nouns = ["Student", "Scholar", "Learner", "Thinker", "Mind", "Achiever", "Grad", "Star"];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 999) + 1;
  
  return `${randomAdjective}${randomNoun}${randomNum}`;
};

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState("username");
  const [username, setUsername] = useState(getRandomUsername());
  const [timetableConfirmed, setTimetableConfirmed] = useState(false);
  const [preferencesCompleted, setPreferencesCompleted] = useState(false);
  const [attendanceCompleted, setAttendanceCompleted] = useState(false);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setCurrentStep("timetable");
    }
  };

  const handleTimetableComplete = () => {
    setTimetableConfirmed(true);
    setCurrentStep("attendance");
  };

  const handleAttendanceComplete = () => {
    setAttendanceCompleted(true);
    setCurrentStep("preferences");
  };

  const handlePreferencesComplete = () => {
    setPreferencesCompleted(true);
    onComplete(username);
  };

  const getStepIcon = (step: string) => {
    switch (step) {
      case "username":
        return <UserCircle className="h-10 w-10 mb-2 text-study-primary" />;
      case "timetable":
        return <FolderUp className="h-10 w-10 mb-2 text-study-primary" />;
      case "attendance":
        return <CalendarClock className="h-10 w-10 mb-2 text-study-primary" />;
      case "preferences":
        return <ClipboardList className="h-10 w-10 mb-2 text-study-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-study-light/50 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-study-light to-study-blue">
            <h2 className="text-2xl font-bold text-center">Welcome to Study Buddy</h2>
            <p className="text-center text-muted-foreground mt-2">
              Your AI-powered study companion for perfect attendance and optimized schedules
            </p>
          </div>
          
          <Tabs value={currentStep} className="w-full">
            <div className="p-4 border-b">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger 
                  value="username"
                  className="data-[state=active]:bg-study-primary data-[state=active]:text-white"
                >
                  Username
                </TabsTrigger>
                <TabsTrigger 
                  value="timetable"
                  disabled={currentStep === "username"}
                  className="data-[state=active]:bg-study-primary data-[state=active]:text-white"
                >
                  Timetable
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance"
                  disabled={currentStep === "username" || currentStep === "timetable"}
                  className="data-[state=active]:bg-study-primary data-[state=active]:text-white"
                >
                  Attendance
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  disabled={currentStep === "username" || currentStep === "timetable" || currentStep === "attendance"}
                  className="data-[state=active]:bg-study-primary data-[state=active]:text-white"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <TabsContent value="username" className="mt-0">
                <div className="text-center mb-6">
                  {getStepIcon("username")}
                  <h3 className="text-xl font-semibold">Choose Your Username</h3>
                  <p className="text-muted-foreground mt-1">This is how you'll be identified in the app</p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-center"
                    placeholder="Enter username"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    No sign-up required! Just choose a username to start.
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button onClick={handleUsernameSubmit} className="btn-gradient">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timetable" className="mt-0">
                <div className="text-center mb-6">
                  {getStepIcon("timetable")}
                  <h3 className="text-xl font-semibold">Upload Your Timetable</h3>
                  <p className="text-muted-foreground mt-1">
                    Let's understand your class schedule
                  </p>
                </div>
                
                <TimetableUpload onComplete={handleTimetableComplete} />
              </TabsContent>

              <TabsContent value="attendance" className="mt-0">
                <div className="text-center mb-6">
                  {getStepIcon("attendance")}
                  <h3 className="text-xl font-semibold">Set Attendance Goals</h3>
                  <p className="text-muted-foreground mt-1">
                    Tell us about your current and target attendance
                  </p>
                </div>
                
                <AttendanceForm onComplete={handleAttendanceComplete} />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <div className="text-center mb-6">
                  {getStepIcon("preferences")}
                  <h3 className="text-xl font-semibold">Study Preferences</h3>
                  <p className="text-muted-foreground mt-1">
                    Help us customize your perfect study plan
                  </p>
                </div>
                
                <PreferencesForm onComplete={handlePreferencesComplete} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
