"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Form, Input } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastSuccess, toastFailed } from "@/utils/toastify";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const idUser = localStorage.getItem("id_user") || "";
  const username = localStorage.getItem("username") || "Admin";

  const [data, setData] = useState();

  const initialValues = {
    id: idUser,
    username: data?.name,
    email: data ? data?.primary_email : "",
    nomor_telephone: data ? data?.phone : "",
  };

  const getData = async () => {
    try {
      const res = await API.post(URL.GET_DETAIL_SUPP, {
        id: idUser,
      });
      const data = res.data.result.items[0];
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        id: Yup.string().required("Required"),
        username: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        nomor_telephone: Yup.string().required("Required"),
        password: Yup.string()
          .required("Password is required")
          .min(5, "Your password is too short."),
        confirmpassword: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match"
        ),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newValues = {
            supp_id: values.id,
            username: values.username,
            password: values.password,
            email: values.email,
            nomor_telephone: values.nomor_telephone,
          };

          const res = await API.post(URL.EDIT_SUPP, newValues);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Edit Profile Success");
            router.push("/dashboard");
          }, 400);
        } catch (error) {
          toastFailed("Edit Profile Failed");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
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
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <label htmlFor="username" className="min-w-44">
                      Username
                    </label>
                    <p>:</p>
                    <Input
                      disabled
                      name="username"
                      size="large"
                      required
                      value={formik.values.username}
                      {...formik.getFieldProps("username")}
                    />
                  </div>

                  <div>
                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_lokal" className="min-w-44">
                        Password
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          required
                          placeholder=""
                          size="large"
                          type="password"
                          value={formik.values.password}
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-600">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <label htmlFor="nama_lokal" className="min-w-44">
                      Konfirmasi password
                    </label>
                    <p>:</p>
                    <div className="flex flex-col w-full">
                      <Input
                        required
                        placeholder=""
                        size="large"
                        type="password"
                        value={formik.values.confirmpassword}
                        {...formik.getFieldProps("confirmpassword")}
                      />
                      {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword ? (
                        <div className="text-red-600">
                          {formik.errors.confirmpassword}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <label htmlFor="nama_lokal" className="min-w-44">
                      Email
                    </label>
                    <p>:</p>
                    <div className="flex flex-col w-full">
                      <Input
                        type="email"
                        placeholder=""
                        size="large"
                        value={formik.values.email}
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-600">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <label htmlFor="nama_lokal" className="min-w-44">
                      Phone Number
                    </label>
                    <p>:</p>
                    <div className="flex flex-col w-full">
                      <Input
                        placeholder=""
                        size="large"
                        value={formik.values.nomor_telephone}
                        {...formik.getFieldProps("nomor_telephone")}
                      />
                      {formik.touched.nomor_telephone &&
                      formik.errors.nomor_telephone ? (
                        <div className="text-red-600">
                          {formik.errors.nomor_telephone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-4">
                  <button
                    type="submit"
                    className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </ConfigProvider>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Profile;
