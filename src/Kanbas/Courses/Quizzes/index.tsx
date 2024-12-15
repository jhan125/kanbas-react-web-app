import QuizControls from "./QuizControls";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as client from "./client"
import { setQuizzes, deleteQuizzes } from "./QuizReducer";
import QuizMenuButtons from "./QuizMenuButtons";
import { FaSortDown } from "react-icons/fa";
import { LuPlane } from "react-icons/lu";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal";
import * as userClient from "../../Account/client";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function Quizzes(
   { courses }:
      { courses: any[]; }) {

   const { currentUser } = useSelector((state: any) => state.accountReducer);
   console.log("[Quiz] Current user:", currentUser._id);
   const { cid } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { quizzes } = useSelector((state: any) => state.QuizReducer);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

   useEffect(() => {
      const fetchQuizzes = async () => {
         const quizzes = await client.findQuizzesByCourse(cid as string);
         dispatch(setQuizzes(quizzes));
         console.log("After dispatch, set quizzes: ", quizzes);
         // Proper place to log each quiz if dependent on fetching
         quizzes.forEach((quiz: any) => console.log("Print out all quizzes titles: ", quiz.title));
      };
      fetchQuizzes();

   }, [cid, dispatch, currentUser._id]);

   const removeQuiz = async () => {
      if (selectedQuizId) {
         await client.deleteQuiz(selectedQuizId);
         dispatch(deleteQuizzes(selectedQuizId));
         setShowDeleteModal(false); // Close modal after deleting
      }
   };

   const openDeleteModal = (quizId: string) => {
      setSelectedQuizId(quizId);
      setShowDeleteModal(true);
   };

   const navigateToQuizDetail = (quizId: string, quizTitle: string) => {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`, { state: { title: quizTitle } });
   };

   const getQuizStatus = (due: Date, available: string, until: string) => {
      const currentDate = new Date();
      const dueDate = new Date(due);
      const availableDate = new Date(available);
      const untilDate = new Date(until);

      // Adjust due date to the next day for comparison
      const dayAfterDue = new Date(dueDate.getTime());
      dayAfterDue.setDate(dueDate.getDate() + 1);

      // Closed - if current date is after quizzes Available Date
      // Available - if current date is between Available Date and Available Until Date
      // Not available until <AVAILABLE DATE> - if current date is before the Available Date
      if (currentDate < availableDate) {
         return `Not available until ${formatDateTime(available)}`;
      } else if (currentDate >= availableDate && currentDate <= untilDate) {
         return 'Available';
      } else if (currentDate > untilDate || currentDate > dueDate) {
         return 'Closed';
      }
   };

   const formatDateTime = (dateStr: string) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";

      // extract individual components
      const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
      const day = date.getDate();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      // AM/PM for 12-hour format
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12 for midnight

      // format string
      return `${month} ${day} at ${hours}:${minutes}${ampm}`;
   };

   return (
      <div id="wd-quizzes" className="container mt-4">

         {userClient.canManageQuiz(currentUser) && (
            <div>
               <QuizControls addQuiz={() => {
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
               }} />
            </div>
         )}

         <ul id="wd-quizzes" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray mt-4">
               <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <FaSortDown className="mb-2" />
                  Assignment Quizzes
                  <div className="ms-auto">
                  </div>
               </div>
               <ul className="wd-quizzes list-group rounded-0" style={{ borderLeftWidth: "thick", borderLeftColor: "green", borderLeftStyle: "solid" }}>
                  {quizzes.length === 0 &&
                     <li
                        className="wd-lesson list-group-item p-3 ps-1 justify-content-between"
                        style={{ width: "100%" }}>
                        <IoIosInformationCircleOutline className="fs-3 me-2" />
                        No quizzes in this list.
                        {currentUser.role === "FACULTY" &&
                           " Please press the [+Quiz] button above to add quiz."}
                     </li>}

                  {quizzes
                     .filter((quiz: any) => quiz.published || userClient.canManageQuiz(currentUser)) // Include unpublished only for faculty
                     .map((quiz: any) => (
                        <li className="wd-quiz list-group-item p-3" style={{ display: 'flex', justifyContent: 'left' }}>
                           <div style={{ display: 'flex', alignItems: 'center' }}>
                              {/* Quiz Icon */}
                              <LuPlane className="fs-4 text-success" style={{ marginTop: "5px" }} />
                           </div>
                           <div>
                           </div>

                           <div
                              style={{ marginLeft: '10px' }} className="ms-3"
                              onClick={() => navigateToQuizDetail(quiz._id, quiz.title)}>
                              <strong>{quiz.title}</strong>
                              <br />

                              <span className="text-muted">
                                 <strong>{getQuizStatus(quiz.due, quiz.available, quiz.until)} </strong>
                              </span>
                              |
                              <span className="text-muted m-2">
                                 <strong> Due  </strong>
                                 {formatDateTime(quiz.due)}
                              </span>
                              |
                              <span className="text-muted m-2">
                                 {quiz.points} pts
                              </span>
                              |
                              <span className="text-muted m-2">
                                 {quiz.questions.length} Questions
                              </span>
                              {/* {userClient.isStudent(currentUser) && (
                                 <span className="text-muted m-2">
                                    {quiz.points} pts
                                 </span>
                              )} */}
                           </div>

                           {userClient.canManageQuiz(currentUser) && (
                              <div className="me-2 " style={{ marginLeft: 'auto' }}>
                                 <QuizMenuButtons
                                    quizId={quiz._id}
                                    deleteQuiz={() => openDeleteModal(quiz._id)}
                                    editQuiz={() => navigateToQuizDetail(quiz._id, quiz.title)}
                                    published={quiz.published}
                                 />
                              </div>
                           )}
                        </li>
                     ))}
               </ul>

               {/* Modal for confirming deletion */}
               <DeleteConfirmationModal
                  show={showDeleteModal}
                  title="Confirm Deletion"
                  itemName="quiz"
                  onDelete={removeQuiz}
                  onClose={() => setShowDeleteModal(false)}
               />
            </li>
         </ul>
      </div>
   )
}