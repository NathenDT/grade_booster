import axios from "axios"

// Replace these with your Canvas instance and personal access token
const BASE_URL = "https://canvas.uw.edu"
const ACCESS_TOKEN =
  "10~7r872czWDw7fPVuveHB6Rr4tCDD2XWHkFuCPJhatBMKVKNGZH83PakXnRJKJnaQZ"

// Set up the authorization headers
const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
}

// Interface definitions for type safety
interface Course {
  id: number
  name: string
}

interface Assignment {
  id: number
  name: string
  points_possible: number
}

interface Submission {
  assignment_id: number
  grade: string
}

// Function to get courses
const getCourses = async (): Promise<Course[]> => {
  const url = `${BASE_URL}/api/v1/users/self/courses`
  const params = {
    enrollment_state: "active",
    state: "all",
  }

  const response = await axios.get(url, { headers, params })
  return response.data
}

// Function to get assignments for a given course
const getAssignments = async (courseId: number): Promise<Assignment[]> => {
  const url = `${BASE_URL}/api/v1/courses/${courseId}/assignments`

  const response = await axios.get(url, { headers })
  return response.data
}

// Function to get grades for a given course
const getGrades = async (courseId: number): Promise<Submission[]> => {
  const url = `${BASE_URL}/api/v1/courses/${courseId}/students/submissions`

  const response = await axios.get(url, { headers })
  return response.data
}

// Function to return a list of JSON objects with name, grade, and possible points for each assignment
const getAssignmentDetails = async (
  courseName: string
): Promise<
  Array<{ name: string; grade: number | null; possible_points: number }>
> => {
  try {
    // Fetch all courses
    const courses = await getCourses()

    // Find the course by name
    let courseId: number | null = null
    for (const course of courses) {
      if (course.name.includes(courseName)) {
        courseId = course.id
        break
      }
    }

    // If course is found, fetch assignments and grades
    if (courseId) {
      const assignments = await getAssignments(courseId)
      const grades = await getGrades(courseId)

      // Prepare the list of assignment details
      return assignments.map((assignment) => {
        const submission = grades.find(
          (grade) => grade.assignment_id === assignment.id
        )
        const grade = submission
          ? submission.grade
            ? Number(submission.grade)
            : null
          : null

        return {
          name: assignment.name,
          grade: grade,
          possible_points: assignment.points_possible,
        }
      })
    } else {
      throw new Error(`Course with name "${courseName}" not found.`)
    }
  } catch (error) {
    console.error("Error fetching assignment details:", error)
    return []
  }
}

export default getAssignmentDetails
