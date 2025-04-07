
import { ClassItem } from "./ClassConfirmation";

// Enhanced dummy data to simulate better timetable extraction
export const dummyTimeTableData: ClassItem[] = [
  // Core courses
  { id: "1", day: "Monday", time: "9:00 AM - 10:30 AM", subject: "CSE101: Introduction to Computer Science", room: "Room 302", isElective: false },
  { id: "2", day: "Monday", time: "11:00 AM - 12:30 PM", subject: "MATH204: Calculus II", room: "Room 201", isElective: false },
  { id: "3", day: "Monday", time: "2:00 PM - 3:30 PM", subject: "BIO101: Introduction to Biology", room: "Lab 405", isElective: false },
  { id: "4", day: "Tuesday", time: "9:00 AM - 10:30 AM", subject: "PHY202: Physics for Engineers", room: "Lab 101", isElective: false },
  { id: "5", day: "Tuesday", time: "11:00 AM - 12:30 PM", subject: "CHEM110: General Chemistry", room: "Lab 203", isElective: false },
  { id: "6", day: "Tuesday", time: "2:00 PM - 3:30 PM", subject: "ENG207: Technical Writing", room: "Room 405", isElective: true },
  { id: "7", day: "Wednesday", time: "9:00 AM - 10:30 AM", subject: "CSE101: Introduction to Computer Science", room: "Room 302", isElective: false },
  { id: "8", day: "Wednesday", time: "11:00 AM - 12:30 PM", subject: "MATH204: Calculus II", room: "Room 201", isElective: false },
  { id: "9", day: "Wednesday", time: "2:00 PM - 4:00 PM", subject: "CSE235: Data Structures and Algorithms", room: "Lab 302", isElective: false },
  { id: "10", day: "Thursday", time: "9:00 AM - 10:30 AM", subject: "PHY202: Physics for Engineers", room: "Lab 101", isElective: false },
  { id: "11", day: "Thursday", time: "11:00 AM - 1:00 PM", subject: "CSE210: Computer Architecture", room: "Room 304", isElective: false },
  { id: "12", day: "Thursday", time: "2:00 PM - 3:30 PM", subject: "STAT301: Probability and Statistics", room: "Room 105", isElective: false },
  { id: "13", day: "Friday", time: "9:00 AM - 10:30 AM", subject: "CSE260: Database Management Systems", room: "Lab 307", isElective: false },
  { id: "14", day: "Friday", time: "11:00 AM - 12:30 PM", subject: "BUS150: Business Management", room: "Room 401", isElective: true },
  { id: "15", day: "Friday", time: "2:00 PM - 3:30 PM", subject: "ART101: Introduction to Design", room: "Studio 3", isElective: true },
];
