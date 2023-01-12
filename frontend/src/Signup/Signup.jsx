import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { signupUtil } from "../apiUtils";
import "./Signup.css";

function Signup() {
  // console.log("render");
  const name = useRef("");
  const username = useRef("");
  const password = useRef("");

  const [pwdValidation, setPwdValidation] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });

  const [isValid, setIsValid] = useState(false);

  const { lowercase, uppercase, number, symbol, length } = pwdValidation;

  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [name, setName] = useState("");

  useEffect(() => {
    const isPwdValid = Object.values(pwdValidation).every(Boolean);
    console.log({ isPwdValid });
    setIsValid(isPwdValid);
    // console.log({ isValid });
  }, [pwdValidation]);

  const validatePasword = (e) => {
    const password = e.target.value;
    console.log(password);
    // regex.test(string)
    const lowercase = /(?=.*[a-z])/.test(password);
    const uppercase = /(?=.*[A-Z])/.test(password);
    const number = /(?=.*\d)/.test(password);
    const symbol = /(?=.*[\W_])/.test(password);
    const length = password.length >= 8;
    // setPassword(password);
    setPwdValidation({ lowercase, uppercase, number, symbol, length });
  };

  // const signup = async (e) => {
  //   const payload = { name, username, password };
  //   try {
  //     const data = await signupUtil(payload)?.data;
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const signup = async (e) => {
    const payload = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
    };
    console.log(payload);
    try {
      const data = (await signupUtil(payload))?.data;
      console.log(data);
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
            <Card.Title>Signup</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" ref={name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter username" ref={username} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={validatePasword}
                  placeholder="Password"
                  ref={password}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid}
                onClick={signup}
              >
                Signup
              </Button>
            </Card.Body>
            <div className="pwd-strength">
              <div className={lowercase ? "text-success" : "text-danger"}>
                Lowercase character :- a-z
              </div>
              <div className={uppercase ? "text-success" : "text-danger"}>
                Uppercase character :- A-Z
              </div>
              <div className={number ? "text-success" : "text-danger"}>
                Numeric character :- 0-9
              </div>
              <div className={symbol ? "text-success" : "text-danger"}>
                Special character :- !@#$%^&*()_+
              </div>
              <div className={length ? "text-success" : "text-danger"}>
                Password should consist of 8 or more character
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;

// className={lowercase ? "text-success" : "text-danger"}
// className={uppercase ? "text-success" : "text-danger"}
// className={number ? "text-success" : "text-danger"}
// className={symbol ? "text-success" : "text-danger"}
// className={length ? "text-success" : "text-danger"}
