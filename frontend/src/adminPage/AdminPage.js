import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";

const AdminNavBar = () => {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Admin
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div
        className="d-flex flex-column align-items-end fixed-top"
        style={{ paddingRight: "15px", paddingTop: "58px" }}
      >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">User</Navbar.Brand>
        </Navbar>
        {/* Add other content or links here */}
      </div>
    </>
  );
};

export default AdminNavBar;
