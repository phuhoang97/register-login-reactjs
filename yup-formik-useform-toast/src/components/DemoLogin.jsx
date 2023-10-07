// DemoLogin.js

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const DemoLogin = () => {
  const [data, setData] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được trống"),
      password: Yup.string().required("Mật khẩu không được trống"),
    }),
    onSubmit: async (values) => {
      try {
        // Gửi yêu cầu để kiểm tra đăng nhập
        const response = await axios.get("http://localhost:8000/users");
        const users = response.data;

        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );

        if (user) {
          toast.success("Đăng nhập thành công");
        } else {
          toast.error("Đăng nhập thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
      }
    },
  });

  return (
    <div>
      <h1>Đăng nhập</h1>
      <form onSubmit={formik.handleSubmit}>
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
          <button type='submit'>Đăng nhập</button>
        </div>
      </form>
    </div>
  );
};

export default DemoLogin;
