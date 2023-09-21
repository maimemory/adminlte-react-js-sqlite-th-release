import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    if (user.username !== "" && user.password !== "") {
      await axios
        .post("http://vsmqtt.space:1000/register", user)
        .then((result) => {
          console.log(result.data);
          if(result.data.message === "User was already registered"){
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "มีชื่อผู้ใช้งานนี้แล้ว!",
            });
          }
          else{
            Swal.fire(
              "ลงทะเบียนสำเร็จ!",
              "กำลังไปยังหน้า Dashboard!",
              "success"
            );
            navigate("/login");
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
            <p className="login-box-msg">กรอกข้อมูลเพื่อลงทะเบียน</p>
            <form onSubmit={e => createUser(e)}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="Username"
                  onChange={e =>
                    setUser({ ...user, username: e.target.value })
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
                  onChange={e =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {/* {JSON.stringify(user)} */}

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    ลงทะเบียน
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-12">
                  <button
                    className="btn btn-default btn-block"
                    onClick={() => navigate("/login")}
                  >
                    ยกเลิก
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

export default Register;
