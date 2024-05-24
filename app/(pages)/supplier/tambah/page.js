"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ConfigProvider, Form, Input } from "antd";

import { toastSuccess, toastFailed } from "@/utils/toastify";
import { API, URL } from "@/config/api";

const TambahSupplierPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      const res = await API.post(URL.CREATE_SUPP, e);

      toastSuccess("Create Supplier Success");
      router.push("/supplier");
    } catch (error) {
      console.log(error);
      toastFailed("Create Supplier Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="text-4xl mb-12">Create Supplier</h1>

      <div className="bg-[#F5F5F5] p-8 rounded-xl">
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
            labelAlign="left"
            labelWrap
            // layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{
              span: 6,
            }}
            // wrapperCol={{
            //   span: 18,
            // }}
            // className="w-1/2"
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Form.Item
                  label="Kode Supplier/ username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username!",
                    },
                  ]}
                >
                  <Input placeholder="input code supplier" size="large" />
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
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Your Password" size="large" />
                </Form.Item>

                <Form.Item
                  label="Nama Lokal"
                  name="nama_lokal"
                  rules={[
                    {
                      required: true,
                      message: "Please input nama toko!",
                    },
                  ]}
                >
                  <Input placeholder="Nama Lokal" size="large" />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="ID Pajak"
                  name="nomor_pajak"
                  rules={[
                    {
                      required: true,
                      message: "Please input nomor pajak!",
                    },
                  ]}
                >
                  <Input placeholder="Nomor pajak" size="large" />
                </Form.Item>

                <Form.Item
                  label="Telepon Number"
                  name="nomor_telephone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your telepon number!",
                    },
                  ]}
                >
                  <Input placeholder="Telepon Number" size="large" />
                </Form.Item>

                <Form.Item
                  label="Telepon Fax"
                  name="telephone_fax"
                  rules={[
                    {
                      required: true,
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
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>
              </div>
            </div>

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

export default TambahSupplierPage;
