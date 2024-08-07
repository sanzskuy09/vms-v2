"use client";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/libs/hook";
import { loginUser } from "@/libs/features/authSlice";

import bg from "../../assets/image/bg_login.png";
import ICONS from "@/config/icons";

import { ConfigProvider, Form, Input } from "antd";

import { API, URL } from "../../config/api";

import { toastFailed, toastSuccess } from "../../utils/toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    // Handle login logic here
    try {
      const res = await API.post(URL.LOGIN, e);

      dispatch(loginUser(res.data.result));

      localStorage.setItem("token", res.data.result.token);
      localStorage.setItem("role", res.data.result.supplier.nama_role);
      localStorage.setItem("id_user", res.data.result.supplier.id);
      localStorage.setItem("username", res.data.result.supplier.username);
      localStorage.setItem("email", res.data.result.supplier.primary_email);

      toastSuccess("Login Success");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toastFailed("Username or Password is wrong");
    }
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
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=vmssupport@gmail.com"
                  target="_blank"
                  className="text-[#0263FF] hover:text-indigo-500 font-medium"
                >
                  Lupa password/Belum punya akun ?{" "}
                </Link>

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
