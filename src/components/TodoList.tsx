
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Clock, 
  ListTodo, 
  Plus, 
  Calendar as CalendarIcon, 
  MoreHorizontal 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample todo data
const initialTodos = [
  {
    id: "todo1",
    title: "Complete PHY202 Lab Report",
    completed: false,
    dueDate: "Tomorrow",
    category: "assignment",
    priority: "high"
  },
  {
    id: "todo2",
    title: "Review CSE101 Lecture Notes",
    completed: false,
    dueDate: "Today",
    category: "study",
    priority: "high"
  },
  {
    id: "todo3",
    title: "Prepare for MATH204 Quiz",
    completed: false,
    dueDate: "In 2 days",
    category: "study",
    priority: "medium"
  },
  {
    id: "todo4",
    title: "Read ENG207 Chapter 3",
    completed: true,
    dueDate: "Yesterday",
    category: "reading",
    priority: "medium"
  },
  {
    id: "todo5",
    title: "Submit ART101 Project Proposal",
    completed: true,
    dueDate: "3 days ago",
    category: "assignment",
    priority: "high"
  },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTask = {
        id: `todo${Date.now()}`,
        title: newTodo,
        completed: false,
        dueDate: "No date",
        category: "study",
        priority: "medium"
      };
      
      setTodos([newTask, ...todos]);
      setNewTodo("");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "assignment":
        return <ListTodo className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "study":
        return <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "reading":
        return <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <ListTodo className="h-4 w-4" />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "assignment":
        return "bg-amber-100 dark:bg-amber-900";
      case "study":
        return "bg-purple-100 dark:bg-purple-900";
      case "reading":
        return "bg-blue-100 dark:bg-blue-900";
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Tasks & Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              className="flex-1"
            />
            <Button onClick={handleAddTodo} className="shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="active" onClick={() => setFilter("active")}>Active</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setFilter("completed")}>Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <div 
                    key={todo.id} 
                    className={`border rounded-md p-3 flex items-start ${getPriorityClass(todo.priority)}`}
                  >
                    <Checkbox 
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Set date</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <div className={`rounded-full ${getCategoryBg(todo.category)} p-1 mr-2`}>
                          {getCategoryIcon(todo.category)}
                        </div>
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{todo.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tasks in this category</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-3">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <div 
                    key={todo.id} 
                    className={`border rounded-md p-3 flex items-start ${getPriorityClass(todo.priority)}`}
                  >
                    <Checkbox 
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Set date</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <div className={`rounded-full ${getCategoryBg(todo.category)} p-1 mr-2`}>
                          {getCategoryIcon(todo.category)}
                        </div>
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{todo.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active tasks</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <div 
                    key={todo.id} 
                    className={`border rounded-md p-3 flex items-start ${getPriorityClass(todo.priority)}`}
                  >
                    <Checkbox 
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Set date</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <div className={`rounded-full ${getCategoryBg(todo.category)} p-1 mr-2`}>
                          {getCategoryIcon(todo.category)}
                        </div>
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{todo.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed tasks</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-study-tertiary/10 to-study-primary/10 border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-study-primary/20 p-2 backdrop-blur-sm">
              <Clock className="h-6 w-6 text-study-tertiary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Time Management Tip</h3>
              <p className="text-sm text-muted-foreground">
                Try the Pomodoro technique for your PHY202 Lab Report: 25 minutes of focused work, followed by a 5-minute break. Repeat 4 times, then take a longer 15-30 minute break.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
