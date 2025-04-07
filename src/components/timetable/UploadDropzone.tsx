
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadDropzoneProps {
  onFileChange: (file: File) => void;
}

const UploadDropzone = ({ onFileChange }: UploadDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      onFileChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      onFileChange(droppedFile);
    }
  };

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-study-primary/60 transition-colors"
      onClick={openFileSelector}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
      <p className="mb-2 font-medium">Drag and drop or click to upload</p>
      <p className="text-sm text-muted-foreground mb-4">
        Upload your college timetable (PDF or image)
      </p>
      <input
        type="file"
        ref={fileInputRef}
        id="timetable-upload"
        accept=".pdf,image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          openFileSelector();
        }}
        variant="outline"
        className="mx-auto"
      >
        Select File
      </Button>
    </div>
  );
};

export default UploadDropzone;
