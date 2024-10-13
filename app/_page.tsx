"use client";

import React, { useEffect, useState } from 'react';

// Define interfaces for data types
interface Course {
  id: number;
  name: string;
}

interface Assignment {
  id: number;
  name: string;
  points_possible: number | null;
  grade: string | number | null;
}

// Example data with a list of courses and their assignments
const exampleCourses = [
  {
    course_id: 1748971,
    course_name: "INFO 290",
    assignments: [
      { name: "Reflection 1 (Note - Contains two segments)", grade: 5, total_points: 5.0 },
      { name: "Reflection 2", grade: 5, total_points: 5.0 },
      { name: "Reflection 3", grade: "Not graded", total_points: 5.0 },
      { name: "Teamwork Reflection Assignment Overview", grade: "Not submitted", total_points: null },
      { name: "Team Reflection 1 – Early Impressions And Thoughts", grade: "Not graded", total_points: 10.0 },
      { name: "Team Reflection 2 - Team Leadership", grade: "Not graded", total_points: 10.0 },
      { name: "Team Reflection 3 - About The Work", grade: "Not graded", total_points: 10.0 },
      { name: "Team Reflection 4 - Peer Evaluations", grade: "Not submitted", total_points: 10.0 },
      { name: "Team Reflection 5 - Wrap-Up", grade: "Not submitted", total_points: 10.0 },
      { name: "Resume and LinkedIn Profile", grade: "Not graded", total_points: 5.0 }
    ]
  },
  {
    course_id: 1748972,
    course_name: "INFO 200",
    assignments: [
      { name: "Assignment 1", grade: 8, total_points: 10.0 },
      { name: "Assignment 2", grade: "Not graded", total_points: 10.0 },
      { name: "Final Exam", grade: "Not submitted", total_points: 20.0 }
    ]
  }
];

// React component to fetch and display course data
const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // Simulate fetching courses
  const getCourses = () => {
    // Map over exampleCourses to extract course data for the list
    const courseList = exampleCourses.map(course => ({
      id: course.course_id,
      name: course.course_name
    }));
    setCourses(courseList);
  };

  // Simulate fetching assignments for a selected course
  const getAssignments = (courseId: number) => {
    const selectedCourse = exampleCourses.find(course => course.course_id === courseId);
    if (selectedCourse) {
      const mappedAssignments = selectedCourse.assignments.map((assignment) => ({
        id: Math.random(), // Replace with real ID if available
        name: assignment.name,
        points_possible: assignment.total_points,
        grade: assignment.grade
      }));
      setAssignments(mappedAssignments);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    getCourses();
  }, []);

  // Handle course selection
  const handleCourseSelect = async (courseId: number) => {
    setSelectedCourseId(courseId);
    getAssignments(courseId);
  };

  return (
    <div className="App">
      <h1>Canvas Grade Calculator</h1>

      {/* List of Courses */}
      <h2>Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <button onClick={() => handleCourseSelect(course.id)}>{course.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active courses found.</p>
      )}

      {/* Assignments and Grades for the selected course */}
      {selectedCourseId && (
        <div>
          <h2>Assignments and Grades</h2>
          {assignments.length > 0 ? (
            <ul>
              {assignments.map(assignment => (
                <li key={assignment.id}>
                  {assignment.name}: {assignment.grade || 'Not graded'} / {assignment.points_possible || 'N/A'} points
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments found for this course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
