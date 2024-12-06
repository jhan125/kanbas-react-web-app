import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-md-block">
        <CourseStatus />
      </div>
    </div>
  );
}

// import { useParams } from "react-router";
// import Modules from "../Modules";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import * as coursesClient from "../client";

// export default function Home() {
//   const { cid } = useParams();
//   const [currentCourse, setCurrentCourse] = useState<any>({});
//   const [enrolledUsers, setEnrolledUsers] = useState<any>([]);
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   // const dispatch = useDispatch();

//   const fetchCurrentCourse = async (cid: string) => {
//     const course = await coursesClient.getCourseById(cid);
//     setCurrentCourse(course);
//   };

//   const fetchEnrolledUsers = async (cid: string) => {
//     const users = await coursesClient.findEnrolledUsers(cid);
//     setEnrolledUsers(users);
//   };

//   useEffect(() => {
//     if (!cid) {
//       console.error("No course ID provided.");
//       return;
//     }
//     fetchCurrentCourse(cid);
//     fetchEnrolledUsers(cid);
//   }, [cid]);

//   return (
//     <div className="d-flex" id="wd-home">
//       <div className="flex-fill">
//         {/* Show the course details */}
//         {currentCourse && (
//           <div>
//             <h2>Course Details</h2>
//             <h2>{currentCourse.name}</h2>
//             <p>{currentCourse.number}</p>
//             <p>{currentCourse.description}</p>
//           </div>
//         )}
//         {currentUser && currentUser.role === "FACULTY" && (
//           <div>
//             <h2>Enrolled Users</h2>
//             <ul>
//               {enrolledUsers.map((user: any) => (
//                 <li key={user._id}>{user.username}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {/* Show a list of enrolled users if the user role is FACULTY*/}
//       </div>
//     </div>
//   );
// }
