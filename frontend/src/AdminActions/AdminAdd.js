import React, { useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import "./adminAdd.css";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../adminPage/AdminHeader";
import axios from "axios";

const AdminAdd = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!userInfo) {
  //       navigate("/");
  //     } else {
  //       setName(userInfo.name);
  //       setEmail(userInfo.email);
  //       setPic(userInfo.pic);
  //     }
  //   }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/dvtodcueq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(name, email, password, pic);
    if (password === confirmPassword) {
      const user = { name, email, password, pic };
      axios
        .post("http://localhost:5000/api/admin/addUser", user)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            navigate("/admin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="adduser">
        <MainScreen title="ADD USER">
          <div className="container">
            <div className="row profileContainer">
              <div className="col-md-6">
                <form onSubmit={submitHandler}>
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
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <div className="mb-3">
                    <label htmlFor="pic" className="form-label">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="pic"
                      accept="image/png, image/jpeg"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    ADD
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

export default AdminAdd;
