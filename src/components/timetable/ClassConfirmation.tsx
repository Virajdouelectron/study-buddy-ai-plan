
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Info } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface ClassItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  isElective: boolean;
}

interface ClassConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extractedClasses: ClassItem[] | null;
  selectedClasses: {[key: string]: boolean};
  onToggleClass: (id: string) => void;
  onConfirm: () => void;
}

const ClassConfirmation = ({ 
  open, 
  onOpenChange,
  extractedClasses, 
  selectedClasses, 
  onToggleClass, 
  onConfirm 
}: ClassConfirmationProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Confirm Your Timetable</DialogTitle>
          <DialogDescription>
            Please review the extracted classes and confirm which ones are part of your schedule.
            Toggle off any class that isn't relevant.
          </DialogDescription>
        </DialogHeader>
        
        <Alert className="bg-study-blue/20 border-study-blue">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            Elective courses are marked. Please make sure they're correctly identified.
          </AlertDescription>
        </Alert>
        
        <div className="max-h-[350px] overflow-y-auto pr-1">
          <div className="space-y-2">
            {extractedClasses?.map((classItem) => (
              <div 
                key={classItem.id}
                className={`border rounded-md p-3 flex items-start ${
                  classItem.isElective ? 'border-study-primary/30 bg-study-light/10' : ''
                }`}
              >
                <Checkbox 
                  id={`class-${classItem.id}`}
                  checked={selectedClasses[classItem.id]}
                  onCheckedChange={() => onToggleClass(classItem.id)}
                  className="mt-1"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <label 
                      htmlFor={`class-${classItem.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {classItem.subject}
                      {classItem.isElective && (
                        <span className="ml-2 text-xs bg-study-primary/20 text-study-tertiary rounded-full px-2 py-0.5">
                          Elective
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {classItem.day} • {classItem.time} • {classItem.room}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onConfirm} className="btn-gradient">
            Confirm Timetable <Check className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassConfirmation;
