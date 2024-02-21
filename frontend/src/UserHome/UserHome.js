import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../screens/LandingPage/LandingPage";
import MyNotes from "../screens/MyNotes/MyNotes";
import CreateNote from "../screens/CreateNote/CreateNote";
import SingleNote from "../screens/singleNote/SingleNote";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

function UserHome({ children }) {
  return (
    <>
      <Header />
      <main>
        <Routes>{children}</Routes>
      </main>
      <Footer />
    </>
  );
}

export default UserHome;
