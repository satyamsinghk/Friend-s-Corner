import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import "./Users/Users.jsx";

import MyNavbar from "./MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { loginWithCookieUtil } from "./apiUtils.js";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { loginWithCookieActionCreator } from "./reducers/userReducer";

const Users = lazy(() => import("./Users/Users.jsx"));
const Toast = lazy(() => import("./Toast.jsx"));
// const Routing = lazy(() => import("./Routing/Routing"));
const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));
const Post = lazy(() => import("./Post/Post.jsx"));

function App() {
  const [isShown, setIsShown] = useState(true);
  const [loginData, setLoginData] = useState(null);
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithCookieActionCreator());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      {" "}
      {loading ? (
        <Spinner animation="border" className="spinner" role="status" />
      ) : null}
      <Toast />
      <MyNavbar user={loginData} />
      <Suspense
        fallback={
          <Spinner animation="border" className="spinner" role="status" />
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button
                  onClick={(e) => {
                    setIsShown((current) => !current);
                  }}
                >
                  Hide/Show
                </button>
                {isShown && <Users user={loginData} />}
              </>
            }
          />
          <Route path="/Post" element={<Post />} />
          {/* <Route path="/route/:id" element={<Routing />} /> */}
          <Route
            path="/Login"
            element={<Login handleLoginData={setLoginData} />}
          />
          <Route path="/Signup" element={<Signup />} />
          {/* <Route /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
