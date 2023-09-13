import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const { setIsLogin, account, setAccount } = useContext(Context);
  
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    if (account.username !== "" && account.password !== "") {
      await axios
        .post("http://localhost:1000/login", account)
        .then((result) => {
          console.log(result.data);
          if (result.data.message === "Incorrect Username") {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Incorrect Username!",
            });
          } else if (result.data.message === "Incorrect Password") {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Incorrect Password!",
            });
          } else {
            Swal.fire(
              "Login Successfully!",
              "Redirect to Dashboard!",
              "success"
            );
            setIsLogin(true);
            localStorage.setItem('alreadyLogin', true);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Username or password is empty!",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>React</b>JS
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={(e) => signIn(e)}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {/* {JSON.stringify(account)} */}

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-12">
                  <button
                    className="btn btn-default btn-block"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.login-box */}
    </div>
  );
}

export default Login;
