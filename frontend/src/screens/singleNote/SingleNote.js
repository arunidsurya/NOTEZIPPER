import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import Header from "../../components/Header/Header";

function SingleNote({ match }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const { id } = useParams();
  console.log(id); // To verify if id is correctly f

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete) || {};
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  // const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo); // Access userInfo from Redux state

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <>
      <Header />

      <MainScreen title="Edit Note">
        <Card>
          <Card.Header>Edit your Note</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  placeholder="Enter the Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button variant="primary" type="submit">
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(id)}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Updated on - {date.substring(0, 10)}
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  );
}

export default SingleNote;
