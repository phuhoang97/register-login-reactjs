// RegistrationForm.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const DemoRegister = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên người dùng không được trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được trống"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu không được trống"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
        .required("Xác nhận mật khẩu không được trống"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8000/users", values)
        .then((response) => {
          toast.success("Registration successful");
        })
        .catch((error) => {
          toast.error("Đăng ký thất bại");
        });
    },
  });

  return (
    <div>
      <h1>Đăng ký</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor='username'>Tên người dùng:</label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label htmlFor='password'>Mật khẩu:</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Xác nhận mật khẩu:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <button type='submit'>Đăng ký</button>
        </div>
      </form>
    </div>
  );
};

export default DemoRegister;
