import { FaPlus, FaUserCircle } from "react-icons/fa";
import * as client from "../../Account/client";
import * as courseClient from "../client";
import PeopleDetails from "./Details";
import { useEffect, useState } from "react";

interface Props {
  showAllUsers: boolean;
  showCourseEnrolledUsers: boolean;
  courseId: string;
  nameUsedForFilter?: string; // Optional field for filtering by name
  roleUsedForFilter?: string; // Optional field for filtering by role
}

export default function PeopleTable(props: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const showAllUsers = props.showAllUsers;
  const showCourseEnrolledUsers = props.showCourseEnrolledUsers;
  const courseId = props.courseId;
  const updateUsers = (newUsers: any[]) => {
    setUsers(newUsers);
    filterUsers(newUsers);
  };
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const nameUsedForFilter = props.nameUsedForFilter?.toLowerCase();
  const roleUsedForFilter = props.roleUsedForFilter?.toLowerCase();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (showAllUsers) {
          const users = await client.findAllUsers();
          setUsers(users);
          filterUsers(users);
          return;
        }
        if (showCourseEnrolledUsers && courseId) {
          console.log("courseId: ", courseId)
          const users = await courseClient.findEnrolledUsers(courseId);
          setUsers(users);
          filterUsers(users);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Fallback to an empty array if the fetch fails
        setFilteredUsers([]);
      }
    };
    fetchUsers();
  }, [showAllUsers, showCourseEnrolledUsers, courseId]);

  const handleUserClick = (uid: string) => {
    setSelectedUser(uid); // Set the selected user's UID to display their details
  };
  const cancelUserClick = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    filterUsers(users);
  }, [nameUsedForFilter, roleUsedForFilter]);

  const filterUsers = (users: any[]) => {
    const filtered = users.filter((user: any) => {
      const matchesName = nameUsedForFilter
        ? `${user.firstName} ${user.lastName}`.toLowerCase().includes(nameUsedForFilter)
        : true;
      const matchesRole = roleUsedForFilter
        ? user.role.toLowerCase() === roleUsedForFilter
        : true;
      return matchesName && matchesRole;
    });
    setFilteredUsers(filtered);
  };

  const createUser = async () => {
    const user = await client.createUser({
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
    setUsers([...users, user]);
    filterUsers([...users, user]);
  }

  return (
    <div>
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <div id="wd-people-table">
        {selectedUser && <PeopleDetails uid={selectedUser} cancelUserClick={cancelUserClick} updateUsers={updateUsers} users={users} />}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Section</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? ( // Check if users array is empty
              <tr>
                <td colSpan={6} className="text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user: any) => (
                <tr key={user._id}>
                  <td id="wd-full-name" className="text-nowrap">
                    <button
                      className="btn btn-link text-decoration-none"
                      onClick={() => handleUserClick(user._id)}
                    >
                      <FaUserCircle className="text-secondary me-2 fs-1" />
                      <span className="text-danger" id="wd-first-name">
                        {user.firstName}{" "}
                      </span>
                      <span className="text-danger" id="wd-last-name">
                        {user.lastName}
                      </span>
                    </button>
                  </td>
                  <td id="wd-login-id">{user.loginId}</td>
                  <td id="wd-section">{user.section}</td>
                  <td id="wd-email">{user.email}</td>
                  <td id="wd-role">{user.role}</td>
                  <td id="wd-last-activity">{user.lastActivity}</td>
                  <td id="wd-total-activity">{user.totalActivity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
