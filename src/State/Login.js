import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";

export default function Login() {
  //   const [email, setEmail] = useState('')
  //   const [password, setPassword] = useState('')

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const isEmail = (email) => {
    const pattern = /^[a-z]+[a-z-_\.0-9]+@[a-z]+[a-z-_\.0-9]\.[a-z]{2,}$/;
    return pattern.test(email);
  };

  const isPasswordStrength = (password) => {
    const pattern =
      /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    return pattern.test(password);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const { email, password } = form;

    const errors = {
      email: {},
      password: {},
    };

    if (typeof email === "string" && email.trim() === "") {
      errors.email.required = "Email không được để trống";
    } else if (!isEmail(email)) {
      errors.email.email = "Email không đúng định dạng";
    }

    if (typeof password === "string" && password.trim() === "") {
      errors.password.required = "Mật khẩu không được để trống";
    } else if (!isPasswordStrength(password)) {
      errors.password.strength = "Mật khẩu không đủ mạnh";
    }

    setErrors(errors);
  };

  const getError = (errors, fieldName) => {
    if (errors[fieldName] !== undefined) {
      return errors[fieldName][Object.keys(errors[fieldName])[0]];
    }
    return false;
  };

  const handleChangeValue = (e) => {
    // if (e.target.name === 'email'){
    //     setEmail(e.target.value)
    // }

    // if (e.target.name === 'password'){
    //     setPassword(e.target.value)
    // }

    const data = { ...form }; //clone object
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-7">
          <h2 className="text-center">Đăng nhập</h2>
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={clsx('form-control', getError(errors, 'email') && 'is-invalid')}
                id="email"
                placeholder="Email..."
                name="email"
                onChange={handleChangeValue}
              />
              {getError(errors, "email") && (
                <div className="invalid-feedback">
                  {getError(errors, "email")}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className={clsx('form-control', getError(errors, 'password') && 'is-invalid')}
                placeholder="Mật khẩu..."
                id="password"
                name="password"
                onChange={handleChangeValue}
              />
              {getError(errors, "password") && (
                <div className="invalid-feedback">
                  {getError(errors, "password")}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
