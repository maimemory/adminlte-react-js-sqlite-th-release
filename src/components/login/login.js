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
        .post("http://vsmqtt.space:1000/login", account)
        .then((result) => {
          console.log(result.data);
          if (result.data.message === "Incorrect Username") {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "ชื่อผู้ใช้งานไม่ถูกต้อง!",
            });
          } else if (result.data.message === "Incorrect Password") {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "รหัสผ่านไม่ถูกต้อง!",
            });
          } else {
            Swal.fire(
              "เข้าสู่ระบบสำเร็จ!",
              "กำลังไปยังหน้า Dashboard!",
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
        text: "กรุณากรอกข้อมูลให้ครบถ้วน!",
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
              <b>Memo</b>JS
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
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
                    เข้าสู่ระบบ
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-12">
                  <button
                    className="btn btn-default btn-block"
                    onClick={() => navigate("/register")}
                  >
                    ลงทะเบียน
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
