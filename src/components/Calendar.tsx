
import React, { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, ListTodo, Clock } from "lucide-react";
import { format, isSameDay } from "date-fns";

// Sample events data
const eventsData = [
  {
    id: 1,
    date: new Date(2025, 3, 7), // April 7, 2025
    events: [
      { 
        id: "class1", 
        type: "class", 
        title: "CSE101: Introduction to Computer Science", 
        time: "9:00 AM - 10:30 AM", 
        location: "Room 302",
        priority: "high"
      },
      { 
        id: "study1", 
        type: "study", 
        title: "Study: MATH204 Review", 
        time: "3:00 PM - 4:00 PM",
        technique: "Pomodoro: 25 min focus",
        priority: "medium"
      },
      { 
        id: "assignment1", 
        type: "assignment", 
        title: "Assignment: PHY202 Lab Report", 
        time: "4:30 PM - 6:00 PM",
        dueDate: "Due tomorrow",
        priority: "high"
      }
    ]
  },
  {
    id: 2,
    date: new Date(2025, 3, 8), // April 8, 2025
    events: [
      { 
        id: "class2", 
        type: "class", 
        title: "PHY202: Physics for Engineers", 
        time: "9:00 AM - 10:30 AM", 
        location: "Lab 101",
        priority: "high"
      },
      { 
        id: "class3", 
        type: "class", 
        title: "ENG207: Technical Writing", 
        time: "2:00 PM - 3:30 PM", 
        location: "Room 405",
        priority: "medium"
      }
    ]
  },
  {
    id: 3,
    date: new Date(2025, 3, 9), // April 9, 2025
    events: [
      { 
        id: "class4", 
        type: "class", 
        title: "CSE101: Introduction to Computer Science", 
        time: "9:00 AM - 10:30 AM", 
        location: "Room 302",
        priority: "high"
      },
      { 
        id: "study2", 
        type: "study", 
        title: "Study: CSE101 Concepts", 
        time: "2:00 PM - 3:30 PM",
        technique: "Time blocking: 90 min focus",
        priority: "high"
      }
    ]
  }
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Find events for the selected date
  const selectedDateEvents = eventsData.find(day => 
    isSameDay(day.date, selectedDate)
  )?.events || [];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "study":
        return <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "assignment":
        return <ListTodo className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventTypeBg = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 dark:bg-blue-900";
      case "study":
        return "bg-purple-100 dark:bg-purple-900";
      case "assignment":
        return "bg-amber-100 dark:bg-amber-900";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-2 border-red-500";
      case "medium":
        return "border-l-2 border-amber-500";
      case "low":
        return "border-l-2 border-green-500";
      default:
        return "";
    }
  };

  // Custom day render to show event dots
  const hasDayEvents = (day: Date) => {
    return eventsData.some(event => isSameDay(event.date, day));
  };

  // Highlight special dates in the calendar
  const getDayClass = (day: Date) => {
    const hasEvents = hasDayEvents(day);
    return hasEvents ? "relative" : "";
  };

  // Function to render event dot indicators
  const renderEventDot = (day: Date) => {
    const hasEvents = hasDayEvents(day);
    if (!hasEvents) return null;

    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className="h-1 w-1 rounded-full bg-study-primary"></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            month={date}
            onMonthChange={setDate}
            className="mx-auto"
            modifiers={{
              hasEvent: eventsData.map(event => event.date)
            }}
            modifiersClassNames={{
              hasEvent: "relative"
            }}
            components={{
              DayContent: (props) => {
                const dayDate = props.date;
                return (
                  <div className={getDayClass(dayDate)}>
                    <div>{props.date.getDate()}</div>
                    {renderEventDot(dayDate)}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>{format(selectedDate, "EEEE, MMMM d, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={`border rounded-md p-3 flex items-start ${getPriorityClass(event.priority)}`}
                >
                  <div className={`rounded-full ${getEventTypeBg(event.type)} p-2`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{event.time}</span>
                      {event.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{event.location}</span>
                        </>
                      )}
                      {event.technique && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{event.technique}</span>
                        </>
                      )}
                      {event.dueDate && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-red-500">{event.dueDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events scheduled for this day</p>
              <Button variant="outline" className="mt-4">
                Plan a study session
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
