import React, { useEffect } from "react";
import "./LandingPage.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <>
      <Header />

      <div className="main">
        <div className="container">
          <div className="row">
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to Note Zipper</h1>
                <p className="subtitle">One safe place for all your notes</p>
              </div>
              <div className="buttonContainer">
                <a href="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="lg"
                    className="landingbutton"
                    variant="outline-primary"
                  >
                    Signup
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
