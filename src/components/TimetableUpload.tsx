import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UploadDropzone from "./timetable/UploadDropzone";
import FilePreview from "./timetable/FilePreview";
import ProcessingState from "./timetable/ProcessingState";
import ClassConfirmation from "./timetable/ClassConfirmation";
import { dummyTimeTableData } from "./timetable/mockData";
import { ClassItem } from "./timetable/ClassConfirmation";

interface TimetableUploadProps {
  onComplete: () => void;
}

const TimetableUpload = ({ onComplete }: TimetableUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedClasses, setExtractedClasses] = useState<ClassItem[] | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
      if (selectedFile.type === 'application/pdf') {
        toast({
          title: "PDF Received",
          description: `File "${selectedFile.name}" is ready to be analyzed`,
        });
      }
    }
  };

  const resetFileSelection = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        
        const initialSelectedClasses: {[key: string]: boolean} = {};
        dummyTimeTableData.forEach(item => {
          initialSelectedClasses[item.id] = true;
        });
        
        setSelectedClasses(initialSelectedClasses);
        setExtractedClasses(dummyTimeTableData);
        setShowConfirmDialog(true);
        
        toast({
          title: "Timetable analyzed",
          description: `Successfully extracted ${dummyTimeTableData.length} classes from your timetable.`,
        });
      }, 2000);
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
    toast({
      title: "Timetable confirmed",
      description: "Your class schedule has been saved successfully",
    });
    onComplete();
  };

  const showUploadDropzone = !file && !isUploading && !isAnalyzing && !extractedClasses;
  const showFilePreview = file && !isUploading && !isAnalyzing && !extractedClasses;
  const showProcessingState = isUploading || isAnalyzing;

  return (
    <div className="space-y-4">
      {showUploadDropzone && (
        <UploadDropzone onFileChange={handleFileChange} />
      )}

      {showFilePreview && file && (
        <FilePreview 
          file={file}
          filePreview={filePreview}
          onReset={resetFileSelection}
          onUpload={handleUpload}
        />
      )}

      {showProcessingState && (
        <ProcessingState 
          isUploading={isUploading}
          isAnalyzing={isAnalyzing}
        />
      )}

      <ClassConfirmation 
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        extractedClasses={extractedClasses}
        selectedClasses={selectedClasses}
        onToggleClass={handleToggleClass}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TimetableUpload;
