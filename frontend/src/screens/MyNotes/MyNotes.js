import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header/Header";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 3;
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes?.slice(indexOfFirstNote, indexOfLastNote);

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    sccess: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <div>
      <Header />
      <MainScreen title={`Welcome back ${userInfo.name}..`}>
        {/* children */}
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        {currentNotes
          ?.reverse()
          // .filter((filteredNote) => {
          //   filteredNote.title.toLowerCase().includes(search.toLowerCase());
          // })
          .map((note) => (
            <div className="card" style={{ margin: 10 }} key={note._id}>
              <div className="card-header" style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {note.title}
                </span>

                <div>
                  <Button onClick={() => navigate(`/notes/${note._id}`)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="card-body">
                <h4>
                  <span className="badge bg-success">
                    Category - {note.category}
                  </span>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    created on {note.createdAt.substring(0, 10)}
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav>
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(notes?.length / notesPerPage) || 0, // Check if notes is undefined
              }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </MainScreen>
    </div>
  );
};

export default MyNotes;
