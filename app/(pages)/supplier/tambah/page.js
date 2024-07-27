"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ConfigProvider, Form, Input, Select } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastSuccess, toastFailed } from "@/utils/toastify";

const TambahSupplierPage = () => {
  const router = useRouter();

  const initialValues = {
    username: "",
    kode_supplier: "",
    nama_lokal: "",
    nama_perusahaan: "",
    nomor_pajak: "",
    kota: "",
    negara: "",
    nomor_telephone: "",
    telephone_fax: "",
    email: "",
    kode_pos: "",
    alamat_perusahaan1: "",
    alamat_perusahaan2: "",
    role: "2",
    nama_role: "supplier",
    nomor_registrasi_perusahaan: "",
    pajak: "",
    password: "123456",
    confirmpassword: "123456",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        kode_supplier: Yup.string().oneOf(
          [Yup.ref("username")],
          "kode supplier must match"
        ),
        email: Yup.string().email("Invalid email address").required("Required"),
        nomor_telephone: Yup.string().required("Required"),
        telephone_fax: Yup.string().required("Required"),
        password: Yup.string()
          .required("Password is required")
          .min(5, "Your password is too short."),
        confirmpassword: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match"
        ),
        nama_perusahaan: Yup.string().required("Required"),
        nomor_pajak: Yup.string().required("Required"),
        kota: Yup.string().required("Required"),
        negara: Yup.string().required("Required"),
        kode_pos: Yup.string().required("Required"),
        alamat_perusahaan1: Yup.string().required("Required"),
        alamat_perusahaan2: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
        nama_role: Yup.string().required("Required"),
        nomor_registrasi_perusahaan: Yup.string().required("Required"),
        pajak: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newValues = {
            username: values.username,
            kode_supplier: values.kode_supplier,
            nama_lokal: values.nama_lokal,
            nama_perusahaan: values.nama_perusahaan,
            nomor_pajak: values.nomor_pajak,
            kota: values.kota,
            negara: values.negara,
            nomor_telephone: values.nomor_telephone,
            telephone_fax: values.telephone_fax,
            email: values.email,
            kode_pos: values.kode_pos,
            alamat_perusahaan1: values.alamat_perusahaan1,
            alamat_perusahaan2: values.alamat_perusahaan2,
            items: [
              {
                nomor_registrasi_perusahaan: values.nomor_registrasi_perusahaan,
                pajak: values.pajak,
                password: values.password,
                role_id: values.role,
                nama_role: values.nama_role,
              },
            ],
          };

          const res = await API.post(URL.CREATE_SUPP, newValues);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Create Profile Success");
            router.push("/supplier");
          }, 400);
        } catch (error) {
          toastFailed("Create Profile Failed");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div>
          <h1 className="text-4xl mb-12">Form Create Supplier</h1>

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
                  Select: {
                    colorPrimary: "#ED1B24",
                    colorBgContainer: "#F8E1E0",
                    activeBorderColor: "#ED1B24",
                    algorithm: true,
                  },
                },
              }}
            >
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  {/* left side */}
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-4 h-12">
                      <div className="flex gap-3 items-center flex-auto w-[60%]">
                        <label htmlFor="username" className="min-w-44">
                          Username
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-28"
                            value={formik.values.username}
                            {...formik.getFieldProps("username")}
                          />
                          {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-600 text-[10px]">
                              {formik.errors.username}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-3 items-center flex-auto w-[40%]">
                        <label htmlFor="code_supp" className="min-w-16">
                          Kode Supplier
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-24"
                            value={formik.values.kode_supplier}
                            {...formik.getFieldProps("kode_supplier")}
                          />
                          {formik.touched.kode_supplier &&
                          formik.errors.kode_supplier ? (
                            <div className="text-red-600 text-[10px]">
                              {formik.errors.kode_supplier}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 h-12">
                      <div className="flex gap-3 items-center flex-auto w-[60%]">
                        <label htmlFor="role" className="min-w-44">
                          Role
                        </label>
                        <p>:</p>
                        <Select
                          defaultValue="2"
                          size="large"
                          className="w-full"
                          value={formik.values.role}
                          onChange={(value) =>
                            formik.setFieldValue("role", value)
                          }
                          options={[
                            { value: "1", label: "Admin" },
                            { value: "2", label: "Supplier" },
                          ]}
                        />
                      </div>

                      <div className="flex gap-3 items-center flex-auto w-[40%]">
                        <label htmlFor="code_supp" className="min-w-16">
                          Nama Role
                        </label>
                        <p>:</p>
                        <Select
                          defaultValue="supplier"
                          size="large"
                          className="w-full"
                          value={formik.values.nama_role}
                          onChange={(value) =>
                            formik.setFieldValue("nama_role", value)
                          }
                          options={[
                            { value: "admin", label: "Admin" },
                            { value: "supplier", label: "Supplier" },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="password" className="min-w-44">
                        Password
                      </label>
                      <p>:</p>
                      <Input.Password
                        disabled
                        placeholder="Your Password"
                        size="large"
                        value={formik.values.password}
                        {...formik.getFieldProps("password")}
                      />
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="password" className="min-w-44">
                        Konfimasi Password
                      </label>
                      <p>:</p>
                      <Input.Password
                        disabled
                        placeholder="Your Password"
                        size="large"
                        value={formik.values.confirmpassword}
                        {...formik.getFieldProps("confirmpassword")}
                      />
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_lokal" className="min-w-44">
                        Nama Lokal
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_lokal}
                          {...formik.getFieldProps("nama_lokal")}
                        />
                        {formik.touched.nama_lokal &&
                        formik.errors.nama_lokal ? (
                          <div className="text-red-600">
                            {formik.errors.nama_lokal}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_perusahaan" className="min-w-44">
                        Nama Perusahaan
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_perusahaan}
                          {...formik.getFieldProps("nama_perusahaan")}
                        />
                        {formik.touched.nama_perusahaan &&
                        formik.errors.nama_perusahaan ? (
                          <div className="text-red-600">
                            {formik.errors.nama_perusahaan}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_perusahaan" className="min-w-44">
                        Nomor Registrasi Perusahaan
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nomor_registrasi_perusahaan}
                          {...formik.getFieldProps(
                            "nomor_registrasi_perusahaan"
                          )}
                        />
                        {formik.touched.nomor_registrasi_perusahaan &&
                        formik.errors.nomor_registrasi_perusahaan ? (
                          <div className="text-red-600">
                            {formik.errors.nomor_registrasi_perusahaan}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* right side */}
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-4 h-12">
                      <div className="flex gap-3 items-center flex-auto w-[60%]">
                        <label htmlFor="no_pajak" className="min-w-44">
                          Nomor Pajak
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-28"
                            value={formik.values.nomor_pajak}
                            {...formik.getFieldProps("nomor_pajak")}
                          />
                          {formik.touched.nomor_pajak &&
                          formik.errors.nomor_pajak ? (
                            <div className="text-red-600">
                              {formik.errors.nomor_pajak}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-3 items-center flex-auto w-[40%]">
                        <label htmlFor="pajak" className="min-w-16">
                          Pajak
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-24"
                            value={formik.values.pajak}
                            {...formik.getFieldProps("pajak")}
                          />
                          {formik.touched.pajak && formik.errors.pajak ? (
                            <div className="text-red-600">
                              {formik.errors.pajak}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 h-12">
                      <div className="flex gap-3 items-center flex-auto w-[60%]">
                        <label htmlFor="kota" className="min-w-44">
                          Kota
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-28"
                            value={formik.values.kota}
                            {...formik.getFieldProps("kota")}
                          />
                          {formik.touched.kota && formik.errors.kota ? (
                            <div className="text-red-600">
                              {formik.errors.kota}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-3 items-center flex-auto w-[40%]">
                        <label htmlFor="negara" className="min-w-16">
                          Negara
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-24"
                            value={formik.values.negara}
                            {...formik.getFieldProps("negara")}
                          />
                          {formik.touched.negara && formik.errors.negara ? (
                            <div className="text-red-600">
                              {formik.errors.negara}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex gap-3 items-center flex-auto w-[60%]">
                        <label htmlFor="no_hp" className="min-w-44">
                          Nomor Telepon
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-28"
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

                      <div className="flex gap-3 items-center flex-auto w-[40%]">
                        <label htmlFor="fax" className="min-w-16">
                          FAX
                        </label>
                        <p>:</p>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder=""
                            size="large"
                            className="w-24"
                            value={formik.values.telephone_fax}
                            {...formik.getFieldProps("telephone_fax")}
                          />
                          {formik.touched.telephone_fax &&
                          formik.errors.telephone_fax ? (
                            <div className="text-red-600">
                              {formik.errors.telephone_fax}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="email" className="min-w-44">
                        Email
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          type="email"
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
                      <label htmlFor="kode_pos" className="min-w-44">
                        Kode Pos
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_pos}
                          {...formik.getFieldProps("kode_pos")}
                        />
                        {formik.touched.kode_pos && formik.errors.kode_pos ? (
                          <div className="text-red-600">
                            {formik.errors.kode_pos}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="alamat_pt_1" className="min-w-44">
                        Alamat Perusahaan 1
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.alamat_perusahaan1}
                          {...formik.getFieldProps("alamat_perusahaan1")}
                        />
                        {formik.touched.alamat_perusahaan1 &&
                        formik.errors.alamat_perusahaan1 ? (
                          <div className="text-red-600">
                            {formik.errors.alamat_perusahaan1}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="alamat_pt_2" className="min-w-44">
                        Alamat Perusahaan 2
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.alamat_perusahaan2}
                          {...formik.getFieldProps("alamat_perusahaan2")}
                        />
                        {formik.touched.alamat_perusahaan2 &&
                        formik.errors.alamat_perusahaan2 ? (
                          <div className="text-red-600">
                            {formik.errors.alamat_perusahaan2}
                          </div>
                        ) : null}
                      </div>
                    </div>
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
              </form>
            </ConfigProvider>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TambahSupplierPage;
