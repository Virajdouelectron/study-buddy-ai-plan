
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreferencesFormProps {
  onComplete: () => void;
}

const PreferencesForm = ({ onComplete }: PreferencesFormProps) => {
  const [studyTime, setStudyTime] = useState<string>("evening");
  const [studyDuration, setStudyDuration] = useState<string>("60");
  const [breakFrequency, setBreakFrequency] = useState<string>("25");
  const [productivityTools, setProductivityTools] = useState<string[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setProductivityTools((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <Label className="text-base">When do you prefer to study?</Label>
        <RadioGroup value={studyTime} onValueChange={setStudyTime} className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="morning" id="morning" />
            <Label htmlFor="morning" className="cursor-pointer">Morning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="afternoon" id="afternoon" />
            <Label htmlFor="afternoon" className="cursor-pointer">Afternoon</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="evening" id="evening" />
            <Label htmlFor="evening" className="cursor-pointer">Evening</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="night" id="night" />
            <Label htmlFor="night" className="cursor-pointer">Late Night</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label htmlFor="study-duration" className="text-base">
          How long can you study in one session?
        </Label>
        <Select value={studyDuration} onValueChange={setStudyDuration}>
          <SelectTrigger id="study-duration">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
            <SelectItem value="120">2+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="break-frequency" className="text-base">
          How often do you need breaks?
        </Label>
        <Select value={breakFrequency} onValueChange={setBreakFrequency}>
          <SelectTrigger id="break-frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">Every 15 minutes</SelectItem>
            <SelectItem value="25">Every 25 minutes</SelectItem>
            <SelectItem value="30">Every 30 minutes</SelectItem>
            <SelectItem value="45">Every 45 minutes</SelectItem>
            <SelectItem value="60">Every hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-base">What productivity techniques work for you?</Label>
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pomodoro" 
              checked={productivityTools.includes("pomodoro")}
              onCheckedChange={() => handleCheckboxChange("pomodoro")}
            />
            <Label htmlFor="pomodoro" className="cursor-pointer">Pomodoro Technique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="timeblocking" 
              checked={productivityTools.includes("timeblocking")}
              onCheckedChange={() => handleCheckboxChange("timeblocking")}
            />
            <Label htmlFor="timeblocking" className="cursor-pointer">Time Blocking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="todos" 
              checked={productivityTools.includes("todos")}
              onCheckedChange={() => handleCheckboxChange("todos")}
            />
            <Label htmlFor="todos" className="cursor-pointer">To-Do Lists</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="music" 
              checked={productivityTools.includes("music")}
              onCheckedChange={() => handleCheckboxChange("music")}
            />
            <Label htmlFor="music" className="cursor-pointer">Study Music</Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="extracurriculars" className="text-base">
          Do you have any extracurricular activities or commitments?
        </Label>
        <Input
          id="extracurriculars"
          placeholder="E.g., sports practice MWF 4-6pm, part-time job, etc."
          value={extracurriculars}
          onChange={(e) => setExtracurriculars(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full btn-gradient">
        Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default PreferencesForm;
