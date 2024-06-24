"use client";
import React from "react";
import { ConfigProvider, Form, Input } from "antd";

const Profile = () => {
  const username = localStorage.getItem("username") || "Admin";

  console.log(username);

  const handleSubmit = (e) => {
    // dispatch(loginUser({ username: e.username, password: e.password }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="text-4xl mb-12">Edit Profile</h1>

      <div className="bg-[#F5F5F5] p-8 rounded-xl w-1/2 mx-auto">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorPrimary: "#ED1B24",
                colorBgContainer: "#F8E1E0",
                activeBorderColor: "#ED1B24",
                algorithm: true,
              },
            },
          }}
        >
          <Form
            name="basic"
            // layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{
              span: 8,
            }}
            labelAlign="left"
            // wrapperCol={{
            //   span: 18,
            // }}
            // className="w-1/2"
          >
            <div className="">
              <Form.Item label="Username" name="kode_supplier">
                <Input size="large" disabled defaultValue={username} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Your Password" size="large" />
              </Form.Item>
              <Form.Item
                label="Konfirmasi Password"
                name="password1"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Your Password" size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" placeholder="Email" size="large" />
              </Form.Item>

              <Form.Item
                label="Telepon Number"
                name="telp_number"
                rules={[
                  {
                    message: "Please input your telepon number!",
                  },
                ]}
              >
                <Input placeholder="Telepon Number" size="large" />
              </Form.Item>
            </div>

            {/* <div>
                <Form.Item
                  label="Telepon Number"
                  name="telp_number"
                  rules={[
                    {
                      message: "Please input your telepon number!",
                    },
                  ]}
                >
                  <Input placeholder="Telepon Number" size="large" />
                </Form.Item>

                <Form.Item
                  label="Telepon Fax"
                  name="telp_fax"
                  rules={[
                    {
                      message: "Please input your telepon fax!",
                    },
                  ]}
                >
                  <Input placeholder="Telepon Fax" size="large" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>
              </div> */}
            <div className="flex justify-end items-center mt-8">
              <button
                type="submit"
                className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
              >
                Simpan
              </button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Profile;
