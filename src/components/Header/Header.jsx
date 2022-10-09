import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { api } from '../../api';

export default function Header({ title, desc1, desc2, page }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const openLoginForm = () => {
    document.querySelector(".login-form-container").classList.add("active");
  };
  const closeLoginForm = () => {
    document.querySelector(".login-form-container").classList.remove("active");
  };
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await axios({
        method: "POST",
        data: {
          username,
          password,
        },
        url: `${api}/users`,
      });
      localStorage.setItem("isLogin", true);
      window.location.href = "/list";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <header>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc1} />
          <meta name="description" content={desc2} />
          <script
            async
            defer
            crossorigin="anonymous"
            src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0"
            nonce="YuII7xKC"
          ></script>
        </Helmet>
        <div id="menu-bar" className="fas fa-bars"></div>

        {page == "detail" ? (
          <a href="/" className="logo" style={{ margin: "auto" }}>
            <span>V</span>ietnam <span>J</span>oy <span>T</span>ravel
          </a>
        ) : (
          <a href="#" className="logo">
            <span>V</span>ietnam <span>J</span>oy <span>T</span>ravel
          </a>
        )}

        {page == "home" && (
          <>
            <nav className="navbar" style={{ marginLeft: "-16rem" }}>
              <a href="#home">home</a>
              {/* <a href="#book">book</a> */}
              <a href="#packages">packages</a>
              <a href="#services">services</a>
              {/* <a href="#gallery">gallery</a>
      <a href="#review">review</a> */}
              <a href="#contact">contact</a>
            </nav>
            <div className="icons">
              <i className="fas fa-search" id="search-btn"></i>
              <i
                className="fas fa-user"
                id="login-btn"
                onClick={() => openLoginForm()}
              ></i>
            </div>
            <form action="" className="search-bar-container">
              <input
                type="search"
                id="search-bar"
                placeholder="search here..."
              />
              <label for="search-bar" className="fas fa-search"></label>
            </form>{" "}
            <div className="login-form-container">
              <i
                className="fas fa-times"
                id="form-close"
                onClick={() => closeLoginForm()}
              ></i>

              <form onSubmit={onLogin}>
                <h3>login</h3>
                <input
                  type="text"
                  className="box"
                  placeholder="enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="box"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="login now" className="btn" />
                <text
                  style={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  {error}
                </text>{" "}
                <br />
                <input type="checkbox" id="remember" />
                <label for="remember">remember me</label>
                <p>
                  forget password? <a href="#">click here</a>
                </p>
                {/* <p>
        don't have and account? <a href="#">register now</a>
      </p> */}
              </form>
            </div>
          </>
        )}
      </header>
    </>
  );
}
