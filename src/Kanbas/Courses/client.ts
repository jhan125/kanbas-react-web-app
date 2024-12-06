import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const getAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const getCourseById = async (course_id: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${course_id}`);
  return data;
};

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(COURSES_API, course);
  return response.data;
};  

export const deleteCourse = async (course_id: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${course_id}`);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};


// Modules Creation and Searching
export const createCourseModule = async (course_id: any, module: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${course_id}/modules`, module);
  return response.data;
};

export const findModulesByCourseID = async (course_id: any) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${course_id}/modules`);
  return response.data;
};

export const findEnrolledUsers = async (course_id: any) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${course_id}/users`);
  return response.data;
}
