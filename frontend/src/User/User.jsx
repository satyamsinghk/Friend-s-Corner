import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addFriendAction, removeFriendAction } from "../reducers/userReducer";
import "./User.css";

function User(props) {
  const { username } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    dispatch,
    isFriend,
    user: { id, title, firstName, lastName, picture },
  } = props;

  const addFriend = () => {
    if (!username) {
      alert("Please login to continue!!!");
      navigate("/login", { state: pathname });
    }
    const payload = { id, name: firstName };
    dispatch(addFriendAction(payload));
  };

  const removeFriend = () => {
    const payload = { id, name: firstName };
    dispatch(removeFriendAction(payload));
  };

  return (
    <Col lg={4} md={6} sm={10}>
      <Card className="user mb-3">
        <Card.Body className="d-flex justify-content-between">
          <img src={picture} height="100px" alt="User Img"></img>
          <div className="d-flex flex-column justify-content-around">
            <div className="mb-3">
              {title} {firstName} {lastName}
            </div>
            {isFriend ? (
              <Button onClick={removeFriend} variant="danger">
                Remove Friend
              </Button>
            ) : (
              <Button onClick={addFriend} variant="primary">
                Add Friend
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default User;
