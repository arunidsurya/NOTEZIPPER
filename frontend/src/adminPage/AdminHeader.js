import React from "react";
import { Navbar, Nav, Dropdown, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const adminInfo = localStorage.getItem("adminInfo");

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        bg="primary"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand>
            <Link to={"/admin"}>
              <h1>Admin Panel</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <NavDropdown title="View" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/admin">Users</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="Admin" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("adminInfo");
                    navigate("/adminlogin");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminHeader;
