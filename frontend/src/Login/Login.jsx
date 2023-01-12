import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import React, { useRef } from "react";
// import { loginUtil } from "../apiUtils";
// import {useSelector,useDispatch } from "react-redux"
// import { loginActionCreator } from '../reducers/userReducer';
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { loginActionCreator } from "../reducers/userReducer";
import { useLocation, useNavigate } from "react-router-dom";

function Login({ handleLoginData }) {
  // eslint-disable-next-line
  const state = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const username = useRef("");
  const password = useRef("");

  const navigate = useNavigate();
  const { state: prevPath } = useLocation();

  const login = async (e) => {
    const payload = {
      username: username.current.value,
      password: password.current.value,
    };
    console.log(payload);
    try {
      dispatch(loginActionCreator(payload));
      if (prevPath) navigate(prevPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col
          lg={{ offset: 4, span: 4 }}
          md={{ offset: 3, span: 6 }}
          sm={{ offset: 1, span: 10 }}
        >
          <Card className="mt-3 p-3 signup">
            <Card.Title>Login</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter username" ref={username} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={login}>
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
