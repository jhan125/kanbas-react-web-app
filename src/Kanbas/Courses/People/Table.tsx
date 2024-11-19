import { FaPlus, FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import PeopleDetails from "./Details";
import { useEffect, useState } from "react";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-people-table">
      <button onClick={createUser}
        className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        People
      </button>

      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name" />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role" >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
      </select>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td id="wd-full-name" className="text-nowrap">
                <FaUserCircle className="text-secondary me-2 fs-1" />
                <Link to={`/Kanbas/Courses/${cid}/People/${user._id}`} className="no-underline">
                  <span className="text-danger" id="wd-first-name">{user.firstName} </span>
                  <span className="text-danger" id="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              
              <td id="wd-login-id">{user.loginId}</td>
              <td id="wd-section">{user.section}</td>
              <td id="wd-role">{user.role}</td>
              <td id="wd-last-activity">{user.lastActivity}</td>
              <td id="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PeopleDetails fetchUsers={fetchUsers} />
    </div>
  );
}
