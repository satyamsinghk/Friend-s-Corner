import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
// import { logoutUtil } from "./apiUtils";
import { logoutAction } from "./reducers/userReducer";

function MyNavbar() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [, SetURLSearchParams] = useSearchParams();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>Friend's Corner</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 navbar-adjust"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Post">
                To-do
              </Nav.Link>

              {username ? (
                <Nav.Link
                  variant="secondary-outline"
                  as={Button}
                  onClick={(e) => dispatch(logoutAction())}
                >
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Signup">
                    Sign in
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) =>
                  SetURLSearchParams({ search: e.target.value.toLowerCase() })
                }
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
