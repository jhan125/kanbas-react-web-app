import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findAllQuizzes = async() => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}`);
    return response.data
}

export const findQuizzesByCourse = async (courseId: string) => {
    console.log(`Fetching quizzes for course ID: ${courseId}`);
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const updateQuiz = async (quiz: any, quizId: string) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
    console.log(response)
    return response.data; 
}

// export const getQuestions = async (quizId: string) => {
//     const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
//     return data;
// }

 // tested:  if allow a new attempt, create a new empty answer in database, return true
 // if not allowed, return false
export const newAttempt = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/user/${userId}/answers`);
    return data;
}

 /// set the finished status as true -> add attempt number -> give score
export const submitQuiz = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/user/${userId}/answers/finished`);
    return data;
}

// tested: update a already existed answer
export const addAnswerToMap = async (quizId: string, userId: string, answer: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/user/${userId}/answer`, answer);
    return data;
}

// get all answers from different users for a specific quiz by ID
// export const getAnswers = async (quizId: string, userId: string) => {
//     const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/answers`);
//     return data;
// }

// get the only answer linked by userid and quizid
export const getAnswersForQuiz = async (quizId: string, userId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/user/${userId}/answers`);
    return data;
}

// get the last score linked by answer as can be found by userid and quizid
export const getScoreForQuiz = async (quizId: string, userId: string) => {
    const { data }  = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/user/${userId}/score`);
    return data;
}


// export const updateAnswer = async (quizId: string, userId: string, updateAnswer: any) => {
//     const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/user/${userId}/answers/update`, updateAnswer);
//     return data;
// }