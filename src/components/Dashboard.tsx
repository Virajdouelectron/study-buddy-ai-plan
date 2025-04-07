
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calendar from "./Calendar";
import TodoList from "./TodoList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Clock, 
  ListTodo, 
  TrendingUp, 
  Award,
  AlertTriangle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  username: string;
  isMobile: boolean;
}

// Example summary data
const attendanceSummary = {
  overallAttendance: 78,
  targetAttendance: 85,
  classesMissed: 5,
  classesToAttend: 12,
  subjects: [
    { name: "CSE101", attendance: 65, isWarning: true },
    { name: "MATH204", attendance: 80, isWarning: false },
    { name: "PHY202", attendance: 85, isWarning: false },
    { name: "ENG207", attendance: 92, isWarning: false },
    { name: "ART101", attendance: 70, isWarning: true },
  ]
};

const Dashboard = ({ username, isMobile }: DashboardProps) => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Good afternoon, <span className="text-study-primary">{username}</span>!
          </h1>
          <p className="text-muted-foreground">
            Here's your AI-optimized study plan for today.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="overview" className="text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-sm">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-sm">
              Tasks
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Attendance Summary Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Overall Attendance</p>
                    <TrendingUp className="h-4 w-4 text-study-primary" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-end">
                      <span className="text-3xl font-bold">{attendanceSummary.overallAttendance}%</span>
                      <span className="ml-1 text-xs text-muted-foreground">/ {attendanceSummary.targetAttendance}% target</span>
                    </div>
                    <Progress value={attendanceSummary.overallAttendance} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Classes Missed</p>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{attendanceSummary.classesMissed}</span>
                    <p className="text-xs text-muted-foreground mt-1">This semester</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Classes to Attend</p>
                    <BookOpen className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{attendanceSummary.classesToAttend}</span>
                    <p className="text-xs text-muted-foreground mt-1">To reach target</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Today's Plan</p>
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">3</span>
                    <p className="text-xs text-muted-foreground mt-1">Tasks & classes</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject-wise Attendance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceSummary.subjects.map((subject) => (
                    <div key={subject.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{subject.name}</span>
                          {subject.isWarning && (
                            <AlertTriangle className="h-3 w-3 text-orange-500 ml-2" />
                          )}
                        </div>
                        <span className={`text-xs font-medium ${
                          subject.attendance < 75 ? 'text-orange-500' : 
                          subject.attendance > 90 ? 'text-green-500' : ''
                        }`}>
                          {subject.attendance}%
                        </span>
                      </div>
                      <Progress 
                        value={subject.attendance} 
                        className={`h-1.5 ${
                          subject.attendance < 75 ? 'bg-orange-100' : 
                          subject.attendance > 90 ? 'bg-green-100' : ''
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-br from-study-light to-study-blue border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                    <Award className="h-5 w-5 text-study-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Your AI Study Recommendation</h3>
                    <p className="text-sm text-muted-foreground">
                      Focus on CSE101 this week to improve attendance. Attend all classes and review material for 45 minutes daily.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center text-xs gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>3 classes</span>
                      </div>
                      <div className="flex items-center text-xs gap-1">
                        <Clock className="h-3 w-3" />
                        <span>45 min daily</span>
                      </div>
                      <div className="flex items-center text-xs gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Mon, Wed, Fri</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Class */}
                  <div className="border rounded-md p-3 flex items-start">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">CSE101: Introduction to Computer Science</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>9:00 AM - 10:30 AM</span>
                        <span className="mx-2">•</span>
                        <span>Room 302</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-green-600">Attend</span>
                      </div>
                    </div>
                  </div>

                  {/* Study Session */}
                  <div className="border rounded-md p-3 flex items-start">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Study: MATH204 Review</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>3:00 PM - 4:00 PM</span>
                        <span className="mx-2">•</span>
                        <span>Pomodoro: 25 min focus</span>
                      </div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="border rounded-md p-3 flex items-start">
                    <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                      <ListTodo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Assignment: PHY202 Lab Report</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>4:30 PM - 6:00 PM</span>
                        <span className="mx-2">•</span>
                        <span className="text-red-500">Due tomorrow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Calendar />
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <TodoList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
