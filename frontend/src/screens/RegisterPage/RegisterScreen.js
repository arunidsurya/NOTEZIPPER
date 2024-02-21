import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  //   const postDetails = (pics) => {
  //     if (
  //       pics ===
  //       "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //     ) {
  //       return setPicMessage("Please Select an Image");
  //     }
  //     setPicMessage(null);
  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();
  //       data.append("file", pics);
  //       data.append("upload_preset", "notezipper");
  //       data.append("cloud_name", "piyushproj");
  //       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setPic(data.url.toString());
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       return setPicMessage("Please Select an Image");
  //     }
  //   };

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords not matching");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pic) {
      return setPicMessage("Please select an Image");
    }
    setPicMessage(null);

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dvtodcueq");
      fetch("https://api.cloudinary.com/v1_1/dvtodcueq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <>
      <Header />
      <MainScreen title="REGISTER">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic">
              <Form.Label>Profile Picture</Form.Label>
              <input
                type="file"
                className="form-control"
                id="customFile"
                accept="image/png, image/jpeg"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </MainScreen>
    </>
  );
}

export default RegisterScreen;
