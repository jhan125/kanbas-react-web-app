import { useState } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  // const { uid } = useParams();
  const { cid } = useParams();
  // const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const courseId = cid || "";

  const createUser = async () => {
    await client.createUser({
      firstName: "New",
      lastName: `User`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${Date.now()}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: `${Date.now()}`,
      lastActivity: Date.now(),
      totalActivity: `22:33:44`
    });
    // if (user) {
    //   setUsers([...users, user]);
    // }
  };

  // const fetchUsers = async () => {
  //   const users = await client.findAllUsers();
  //   setUsers(users);
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    // if (role) {
    //   const users = await client.findUsersByRole(role);
    //   setUsers(users);
    // } else {
    //   fetchUsers();
    // }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    // if (name) {
    //   const users = await client.findUsersByPartialName(name);
    //   setUsers(users);
    // } else {
    //   fetchUsers();
    // }
  };

  return (
    <div>
      <h3>Users</h3>

      {/* <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button> */}

      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>{" "}
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      {courseId ? (
        <PeopleTable
          showAllUsers={false}
          showCourseEnrolledUsers={true}
          courseId={courseId}
          nameUsedForFilter={name}
          roleUsedForFilter={role}
        />
      ) : (
        <PeopleTable
          showAllUsers={true}
          showCourseEnrolledUsers={false}
          courseId={""}
          nameUsedForFilter={name}
          roleUsedForFilter={role}
        />
      )}
    </div>
  );
}
