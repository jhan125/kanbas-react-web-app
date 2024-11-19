import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

const axiosWithCredentials = axios.create({ withCredentials: true });

{/* ACCOUNT */}

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

{/* COURSE */}
export const findMyCourses = async (user: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
  return data;
};

export const findUnenrolledCourses = async (user: any) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses/enroll`);
  return data;
}

export const enrollCourse = async (user: any, course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${user._id}/courses/enroll`, course);
  return data;
};

export const dropCourse = async (user: any, course: any) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${user._id}/courses`, {data: course});
  return data;
};

export const createCourse = async (user: any, course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};