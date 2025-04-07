
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Upload, Check, Info } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TimetableUploadProps {
  onComplete: () => void;
}

// Dummy data to simulate timetable extraction
const dummyTimeTableData = [
  { id: "1", day: "Monday", time: "9:00 AM - 10:30 AM", subject: "CSE101: Introduction to Computer Science", room: "Room 302", isElective: false },
  { id: "2", day: "Monday", time: "11:00 AM - 12:30 PM", subject: "MATH204: Calculus II", room: "Room 201", isElective: false },
  { id: "3", day: "Tuesday", time: "9:00 AM - 10:30 AM", subject: "PHY202: Physics for Engineers", room: "Lab 101", isElective: false },
  { id: "4", day: "Tuesday", time: "2:00 PM - 3:30 PM", subject: "ENG207: Technical Writing", room: "Room 405", isElective: true },
  { id: "5", day: "Wednesday", time: "9:00 AM - 10:30 AM", subject: "CSE101: Introduction to Computer Science", room: "Room 302", isElective: false },
  { id: "6", day: "Wednesday", time: "11:00 AM - 12:30 PM", subject: "MATH204: Calculus II", room: "Room 201", isElective: false },
  { id: "7", day: "Thursday", time: "9:00 AM - 10:30 AM", subject: "PHY202: Physics for Engineers", room: "Lab 101", isElective: false },
  { id: "8", day: "Friday", time: "2:00 PM - 3:30 PM", subject: "ART101: Introduction to Design", room: "Studio 3", isElective: true },
];

const TimetableUpload = ({ onComplete }: TimetableUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedClasses, setExtractedClasses] = useState<typeof dummyTimeTableData | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<{[key: string]: boolean}>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      
      // Create a preview for image files
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload and AI processing
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        
        // Initialize selectedClasses with all true
        const initialSelectedClasses: {[key: string]: boolean} = {};
        dummyTimeTableData.forEach(item => {
          initialSelectedClasses[item.id] = true;
        });
        
        setSelectedClasses(initialSelectedClasses);
        setExtractedClasses(dummyTimeTableData);
        setShowConfirmDialog(true);
      }, 1500);
    }, 1000);
  };

  const handleToggleClass = (id: string) => {
    setSelectedClasses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    // In a real app, we'd save the selected classes to state or context
    onComplete();
  };

  return (
    <div className="space-y-4">
      {!(filePreview || isUploading || isAnalyzing || extractedClasses) && (
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="mb-2 font-medium">Drag and drop or click to upload</p>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your college timetable (PDF or image)
          </p>
          <input
            type="file"
            id="timetable-upload"
            accept=".pdf,image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button 
            onClick={() => document.getElementById('timetable-upload')?.click()}
            variant="outline"
            className="mx-auto"
          >
            Select File
          </Button>
        </div>
      )}

      {filePreview && !isUploading && !isAnalyzing && !extractedClasses && (
        <div className="space-y-4">
          <div className="relative border rounded-lg overflow-hidden">
            <img 
              src={filePreview} 
              alt="Timetable preview" 
              className="max-h-[300px] mx-auto" 
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
            >
              Replace
            </Button>
          </div>
          <Button 
            onClick={handleUpload} 
            className="w-full btn-gradient"
          >
            Upload & Analyze
          </Button>
        </div>
      )}

      {isUploading && (
        <Card className="border border-study-primary/40">
          <CardContent className="p-6 text-center">
            <div className="inline-block rounded-full p-3 bg-study-soft mb-4">
              <Upload className="h-6 w-6 text-study-primary animate-pulse" />
            </div>
            <h3 className="font-medium">Uploading your timetable...</h3>
            <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="border border-study-primary/40">
          <CardContent className="p-6 text-center">
            <div className="inline-block rounded-full p-3 bg-study-soft mb-4">
              <div className="h-6 w-6 rounded-full border-4 border-study-primary border-t-transparent animate-spin"></div>
            </div>
            <h3 className="font-medium">Our AI is analyzing your timetable...</h3>
            <p className="text-sm text-muted-foreground mt-1">Extracting subjects, timings, and electives</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
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
                    onCheckedChange={() => handleToggleClass(classItem.id)}
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
            <Button onClick={handleConfirm} className="btn-gradient">
              Confirm Timetable <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimetableUpload;
