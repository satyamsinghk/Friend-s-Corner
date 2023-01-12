import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import Login from "../Login/Login";
import "./Users.css";
import User from "../User/User";
import { Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loadingAction } from "../reducers/userReducer";

function Users({ user }) {
  const [users, setUsers] = useState([]);
  const [URLSearchParams] = useSearchParams();

  const { friendList } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = "https://dummyapi.io/data/v1/user?limit=10";
    (async () => {
      const { data } = (
        await axios.get(URL, {
          headers: { "app-id": "6388e12b73edfe4711c6d515" },
        })
      ).data;

      setUsers(data);
    })();
  }, []);

  const searchTerm = URLSearchParams.get("search");

  return (
    <Container fluid>
      {" "}
      <Row>
        {users
          .filter(({ firstName, lastName }) => {
            return (
              !searchTerm ||
              (firstName + lastName).toLowerCase().includes(searchTerm)
            );
          })
          .map((user) => {
            const isFriend = friendList.includes(user?.id);
            return (
              <User
                key={user.id}
                user={user}
                isFriend={isFriend}
                dispatch={dispatch}
              />
            );
          })}
      </Row>
    </Container>
  );
}
export default Users;
