
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AttendanceFormProps {
  onComplete: () => void;
}

// Sample subjects derived from the timetable
const subjects = [
  { id: "CSE101", name: "CSE101: Introduction to Computer Science" },
  { id: "MATH204", name: "MATH204: Calculus II" },
  { id: "PHY202", name: "PHY202: Physics for Engineers" },
  { id: "ENG207", name: "ENG207: Technical Writing" },
  { id: "ART101", name: "ART101: Introduction to Design" },
];

const AttendanceForm = ({ onComplete }: AttendanceFormProps) => {
  const [currentAttendance, setCurrentAttendance] = useState<number>(75);
  const [targetAttendance, setTargetAttendance] = useState<number>(85);
  const [subjectAttendance, setSubjectAttendance] = useState<{[key: string]: number}>(
    Object.fromEntries(subjects.map(subject => [subject.id, 75]))
  );
  const [criticalSubject, setCriticalSubject] = useState<string>("CSE101");

  const handleCurrentAttendanceChange = (value: number[]) => {
    setCurrentAttendance(value[0]);
  };

  const handleTargetAttendanceChange = (value: number[]) => {
    setTargetAttendance(value[0]);
  };

  const handleSubjectAttendanceChange = (subjectId: string, value: number[]) => {
    setSubjectAttendance(prev => ({
      ...prev,
      [subjectId]: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="current-attendance" className="text-base">
            Overall Current Attendance
          </Label>
          <span className="text-2xl font-bold text-study-primary">{currentAttendance}%</span>
        </div>
        <Slider
          id="current-attendance"
          value={[currentAttendance]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleCurrentAttendanceChange}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="target-attendance" className="text-base">
            Overall Target Attendance
          </Label>
          <span className="text-2xl font-bold text-study-primary">{targetAttendance}%</span>
        </div>
        <Slider
          id="target-attendance"
          value={[targetAttendance]}
          min={currentAttendance}
          max={100}
          step={1}
          onValueChange={handleTargetAttendanceChange}
          className="py-4"
        />
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center mb-3">
          <h3 className="font-medium">Subject-wise Attendance</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Set the current attendance for each subject individually
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor={`subject-${subject.id}`} className="text-sm">
                  {subject.name}
                </Label>
                <span className="text-sm font-semibold">{subjectAttendance[subject.id]}%</span>
              </div>
              <Slider
                id={`subject-${subject.id}`}
                value={[subjectAttendance[subject.id]]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleSubjectAttendanceChange(subject.id, value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <Label htmlFor="critical-subject" className="block mb-2">
          Which subject needs the most attendance focus?
        </Label>
        <Select value={criticalSubject} onValueChange={setCriticalSubject}>
          <SelectTrigger id="critical-subject" className="w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full btn-gradient">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default AttendanceForm;
