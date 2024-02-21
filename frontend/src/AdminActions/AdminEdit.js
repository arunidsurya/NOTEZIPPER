// AdminHome.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import AdminHeader from "../adminPage/AdminHeader";
import "./adminEdit.css";

const AdminEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();

  const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/editUser/${id}`).then((res) => {
      // console.log(res.data);
      setEmail(res.data.email);
      setName(res.data.name);
      setPic(res.data.pic);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    const user = { name, email, id };
    axios
      .post("http://localhost:5000/api/admin/updateUser", user)
      .then((res) => {
        console.log(res);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="adminEdit">
        <MainScreen title="EDIT USER">
          <div className="container">
            <div className="row profileContainer">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={pic} alt={name} className="profilePic" />
              </div>
            </div>
          </div>
        </MainScreen>
      </div>
    </>
  );
};

export default AdminEdit;
