import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails(
  { fetchUsers
  }: {
    fetchUsers: () => void;
  }) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, role, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };
  const { uid, cid } = useParams();
  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div id="wd-people-details" className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <Link to={`/Kanbas/Courses/${cid}/People`} className="btn position-fixed end-0 top-0" id="wd-close-details">
        <IoCloseSharp className="fs-1" /> </Link>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2" id="wd-edit" />)}
        {editing && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2" id="wd-save" />)}
        {!editing && (
          <div id="wd-name"
            onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <input className="form-control w-50" id="wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          />
        )}
      </div>
      <b>Roles:</b>
      {!editing && (
        <span id="wd-roles">
          {user.role}
        </span>)}
      {editing && (
        <select defaultValue={user.role} onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { saveUser(); }
          }}
          className="form-select w-50" id="wd-edit-role" >
          <option value="">All Roles</option>        <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>     <option value="FACULTY">Faculty</option>
        </select>
      )}
      <br />
      <b>Email:</b>
      {!editing && (
        <span id="wd-email">
          {user.email}
        </span>)}
      {editing && (
        <input type="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)}
          className="form-control w-50" id="wd-edit-email"
          onKeyDown={(e) => {
            if (e.key === "Enter") { saveUser(); }
          }}>
        </input>
      )}
      <br />
      <b>Login ID:</b>        <span id="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span id="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span id="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end" id="wd-delete" > Delete </button>
      <button onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
        className="btn btn-secondary float-start float-end me-2" id="wd-cancel" > Cancel </button>
    </div>
  );
}