"use client";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/libs/hook";
import { loginUser } from "@/libs/features/authSlice";

import bg from "../../assets/image/bg_login.png";
import ICONS from "@/config/icons";

import { ConfigProvider, Form, Input } from "antd";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    // Handle login logic here
    console.log("Username:", e.username);
    console.log("Password:", e.password);

    dispatch(loginUser({ username: e.username, password: e.password }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="absolute bottom-8 right-12">
        <p className="text-xl text-white">PT Trans Retail Indonesia</p>
      </div>

      <div className="min-h-screen min-w-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ED1B24] bg-opacity-60">
        <div className="w-2/3 h-2/3 p-16 bg-white rounded-3xl shadow-2xl relative">
          <div className="absolute right-8 bottom-8">
            <Image src={ICONS.IC_LOGO} alt="logo" />
          </div>

          <div className="mb-10 w-2/3">
            <h1 className="text-primary font-extrabold text-4xl mb-4 text-wrap">
              Vendor Management System
            </h1>
            <h5 className="font-medium">Sign In</h5>
          </div>

          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorPrimary: "#ED1B24",
                  activeBorderColor: "#ED1B24",
                  algorithm: true,
                },
              },
            }}
          >
            <Form
              name="basic"
              layout="vertical"
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="w-1/2"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>

              <div className="flex justify-between items-center mt-12">
                <a
                  href="#"
                  className="text-[#0263FF] hover:text-indigo-500 font-medium"
                >
                  Lupa password/Belum punya akun ?{" "}
                </a>

                <button
                  type="submit"
                  className="bg-primary text-black px-3 py-1 rounded-md font-medium"
                >
                  Sign In
                </button>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
