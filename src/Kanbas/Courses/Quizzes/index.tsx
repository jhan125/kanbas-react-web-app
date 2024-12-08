import QuizControls from "./QuizControls";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as client from "./client"
import { setQuizzes, deleteQuizzes } from "./QuizReducer";
import QuizMenuButtons from "./QuizMenuButtons";
import { FaSortDown } from "react-icons/fa";
import { LuPlane } from "react-icons/lu";


export default function Quizzes({ courses }: { courses: any[]; }) {
   const { cid } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { quizzes } = useSelector((state: any) => state.QuizReducer);
   console.log(quizzes);

   const fetchQuizzes = async () => {
      const quizzes = await client.findQuizzesByCourse(cid as string);
      dispatch(setQuizzes(quizzes))
    };
   useEffect(() => {
      fetchQuizzes();
   }, [cid]);
  
   const removeQuiz = async (quizId: string) => {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuizzes(quizId));
   };

   const navigateToQuizDetail = (quizId: string, quizTitle: string) => {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`, { state: { title: quizTitle } });
   };

   const formatDate = (date: Date) => {
      const currentDate = new Date();
      const dueDate = new Date(date);

      const dayBeforeDue = new Date(dueDate.getTime());
      dayBeforeDue.setDate(dueDate.getDate() + 1);
      
      return currentDate >= dayBeforeDue ? 'Closed' : 'Available';
   }

   return (
      <div id ="wd-quizzes" className="container mt-4">
         <QuizControls addQuiz={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
      }}/><br /><br />
         <ul id="wd-quizzes" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
               <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <FaSortDown className="mb-2" />
                  Assignment Quizzes
                  <div className="ms-auto">
                  </div>
               </div>
               <ul className="wd-assignments list-group rounded-0" style={{borderLeftWidth: "thick", borderLeftColor: "green", borderLeftStyle: "solid" }}>
                  {quizzes
                     .map((quiz: any) => (
                     <li className="wd-quiz list-group-item p-3" style={{ display: 'flex', justifyContent: 'left' }}>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                        <LuPlane className="fs-4 text-success" style={{ marginTop: "5px" }} />
                     </div>
                     <div>
                     </div>
                     <div style={{ marginLeft: '10px'}} className="ms-3" onClick={() => navigateToQuizDetail(quiz._id, quiz.title)}>
                        <strong>{quiz.title}</strong>
                        <br />
                        <span> <strong>{formatDate(quiz.due)}</strong> {quiz.available} | </span>
                        <strong>Due</strong>
                        <span> {quiz.due} | {quiz.points} pts</span>
                     </div>
                     <div className="me-2 " style={{ marginLeft: 'auto'}}>
                        <QuizMenuButtons
                           quizId={quiz._id}
                           deleteQuiz={(quizId) => {removeQuiz(quizId);}}
                           editQuiz={() => navigateToQuizDetail(quiz._id, quiz.title)}
                           published={quiz.published}
                           />
                     </div>
                     </li>
                     ))}
               </ul>  
            </li>
         </ul>
      </div>
   )
}