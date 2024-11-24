import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails(
  { fetchUsers
  }: {
    fetchUsers: () => void;
  }) {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    console.log("PeopleDetails called fetchUser: ", uid);
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };

  useEffect(() => {
    console.log("PeopleDetails called useEffect: ", uid);
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const deleteUser = async (uid: string) => {
    try {
      await client.deleteUser(uid);
      fetchUsers();// Notify PeopleTable to refresh the table
      navigate(-1); // Navigate back
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    try {
      await client.updateUser(updatedUser); // Update user on the server
      setUser(updatedUser); // Update local copy of the user
      setEditing(false); // Turn off editing
      fetchUsers(); // Refresh the table
      // navigate(-1); // Navigate back to the PeopleTable
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 d-flex flex-column">
      <button
        onClick={() => navigate(-1)}
        className="btn position-absolute end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      <div className="flex-grow-1">
        <div className="text-danger fs-4 wd-name">
          {!editing && (
            <FaPencil
              onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit"
            />
          )}
          {editing && (
            <FaCheck
              onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save"
            />
          )}
          {!editing && (
            <div className="wd-name" onClick={() => setEditing(true)}>
              {user.firstName} {user.lastName}
            </div>
          )}
          {editing && (
            <input
              className="form-control w-50 wd-edit-name"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
          )}
        </div>

        <b>Roles:</b>
        {!editing ? (
          <span className="wd-roles">{user.role}</span>
        ) : (
          <select
            className="form-select w-50 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="STUDENT">Student</option>
            <option value="TA">Assistant</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}
        <br />

        <b>Email:</b>
        {!editing ? (
          <span className="wd-email">{user.email}</span>
        ) : (
          <input
            type="email"
            className="form-control w-50 wd-edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          />
        )}
        <br />

        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>{" "}
        <br />
        <b>Section:</b> <span className="wd-section">{user.section}</span>
        <br />
        <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      </div>

      <hr className="mt-3" />
      <div className="mt-auto d-flex justify-content-between mt-2">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary float-start float-end me-2 wd-cancel">
          Cancel
        </button>

        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger float-end wd-delete">
          Delete
        </button>

      </div>
    </div>
  );

}