import React, { useState } from "react";
import CardInformation from "@/components/CardInformation";

import { ConfigProvider, Form, Input, Button, Modal } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastSuccess, toastFailed } from "@/utils/toastify";

const columnCard = [
  {
    title: "Kode",
    key: "supplier_code",
  },
  {
    title: "Nama Perusahaan",
    key: "company_name",
  },
  {
    title: "Alamat Perusahaan",
    key: "company_address1",
  },
  {
    title: "Kode Pos",
    key: "postal_code",
  },
  {
    title: "Kota",
    key: "city",
  },
  {
    title: "Negara",
    key: "country",
  },
  {
    title: "Nama",
    key: "name",
  },
  {
    title: "Telepon",
    key: "telephone_number",
  },
  {
    title: "Fax",
    key: "fax",
  },
  {
    title: "Email",
    key: "email",
  },
];

const CardInfoSupplier = ({ data, showEditButton }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const initialValues = {
    supplier_code: data?.supplier_code,
    company_name: data?.company_name,
    company_address1: data?.company_address1,
    postal_code: data?.postal_code,
    city: data?.city,
    country: data?.country,
    name: data?.name,
    telephone_number: data?.telephone_number,
    fax: data?.fax,
    email: data?.email,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        supplier_code: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        company_name: Yup.string().required("Required"),
        company_address1: Yup.string().required("Required"),
        postal_code: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        telephone_number: Yup.string().required("Required"),
        fax: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const res = await API.post(URL.ACTION_SAVE_SUPP, { id: data?.id });

          console.log(res);
          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Edit Supplier Success");
            setOpen(false);
          }, 400);
        } catch (error) {
          setOpen(false);
          toastFailed("Edit Supplier Failed");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div>
          <Modal
            title="Edit Supplier"
            open={open}
            onOk={formik.handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={800}
          >
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
                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="supplier_code" className="min-w-44">
                    Kode
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.supplier_code}
                      {...formik.getFieldProps("supplier_code")}
                    />
                    {formik.touched.supplier_code &&
                    formik.errors.supplier_code ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.supplier_code}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="company_name" className="min-w-44">
                    Nama Perusahaan
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.company_name}
                      {...formik.getFieldProps("company_name")}
                    />
                    {formik.touched.company_name &&
                    formik.errors.company_name ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.company_name}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="company_address1" className="min-w-44">
                    Alamat Perusahaan
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.company_address1}
                      {...formik.getFieldProps("company_address1")}
                    />
                    {formik.touched.company_address1 &&
                    formik.errors.company_address1 ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.company_address1}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="postal_code" className="min-w-44">
                    Kode Pos
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.postal_code}
                      {...formik.getFieldProps("postal_code")}
                    />
                    {formik.touched.postal_code && formik.errors.postal_code ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.postal_code}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="city" className="min-w-44">
                    Kota
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.city}
                      {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.city}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="country" className="min-w-44">
                    Negara
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.country}
                      {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.country}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="name" className="min-w-44">
                    Nama
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.name}
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="telephone_number" className="min-w-44">
                    Telepon
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.telephone_number}
                      {...formik.getFieldProps("telephone_number")}
                    />
                    {formik.touched.telephone_number &&
                    formik.errors.telephone_number ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.telephone_number}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="fax" className="min-w-44">
                    FAX
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.fax}
                      {...formik.getFieldProps("fax")}
                    />
                    {formik.touched.fax && formik.errors.fax ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.fax}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="email" className="min-w-44">
                    Email
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.email}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            </ConfigProvider>
          </Modal>

          <CardInformation
            title={"Informasi Supplier"}
            subTitle={data?.company_name}
            column={columnCard}
            data={data}
            showEditButton={showEditButton}
            editSuppButtonAction={showModal}
            openModal={open}
          />
        </div>
      )}
    </Formik>
  );
};

export default CardInfoSupplier;
