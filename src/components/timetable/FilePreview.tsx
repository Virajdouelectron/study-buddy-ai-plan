
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FilePreviewProps {
  file: File;
  filePreview: string | null;
  onReset: () => void;
  onUpload: () => void;
}

const FilePreview = ({ file, filePreview, onReset, onUpload }: FilePreviewProps) => {
  return (
    <div className="space-y-4">
      {filePreview ? (
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
            onClick={onReset}
          >
            Replace
          </Button>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-study-soft rounded-full p-3 mr-3">
              <Upload className="h-5 w-5 text-study-primary" />
            </div>
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {file.type} • {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-2 right-2"
            onClick={onReset}
          >
            Replace
          </Button>
        </div>
      )}
      <div className={filePreview ? "flex items-center justify-between" : ""}>
        {filePreview && (
          <p className="text-sm">
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        )}
        <Button 
          onClick={onUpload} 
          className={`btn-gradient ${!filePreview ? "w-full" : ""}`}
        >
          Upload & Analyze
        </Button>
      </div>
    </div>
  );
};

export default FilePreview;
