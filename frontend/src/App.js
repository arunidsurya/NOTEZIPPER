import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginPage/LoginScreen";
import RegisterScreen from "./screens/RegisterPage/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/singleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AdminPage from "./adminPage/AdminPage";
import AdminEdit from "./AdminActions/AdminEdit";
import AdminLogin from "./adminLogin/AdminLogin";
import AdminAdd from "./AdminActions/AdminAdd";
// import AdminEdit from "./AdminActions/AdminEdit";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/notes/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminEdit/:id" element={<AdminEdit />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminAdd" element={<AdminAdd />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
