import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./adminPage.css";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import MainScreen from "../components/MainScreen";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const admin = localStorage.getItem("adminInfo");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin").then((res) => {
      // console.log(res.data);
      setUsers(res.data);
    });
  }, [deleted, admin]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:5000/api/admin/deleteUser/${id}`)
        .then((res) => {
          console.log(res);
          setDeleted(true);
        });
    }
  };

  return (
    <div className="adminPage">
      <AdminHeader />
      <MainScreen>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "900",
            marginTop: "20px",
            color: "white",
            textDecoration: "underline",
          }}
        >
          USERS
        </h1>
        {admin ? (
          <div className="table-admin">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/adminEdit/${user._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>{navigate("/adminlogin")}</>
        )}
      </MainScreen>
    </div>
  );
};

export default AdminHome;
