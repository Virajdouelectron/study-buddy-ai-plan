
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface ProcessingStateProps {
  isUploading: boolean;
  isAnalyzing: boolean;
}

const ProcessingState = ({ isUploading, isAnalyzing }: ProcessingStateProps) => {
  return (
    <Card className="border border-study-primary/40">
      <CardContent className="p-6 text-center">
        {isUploading ? (
          <>
            <div className="inline-block rounded-full p-3 bg-study-soft mb-4">
              <Upload className="h-6 w-6 text-study-primary animate-pulse" />
            </div>
            <h3 className="font-medium">Uploading your timetable...</h3>
            <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
          </>
        ) : isAnalyzing ? (
          <>
            <div className="inline-block rounded-full p-3 bg-study-soft mb-4">
              <div className="h-6 w-6 rounded-full border-4 border-study-primary border-t-transparent animate-spin"></div>
            </div>
            <h3 className="font-medium">Our AI is analyzing your timetable...</h3>
            <p className="text-sm text-muted-foreground mt-1">Extracting subjects, timings, and electives</p>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ProcessingState;
