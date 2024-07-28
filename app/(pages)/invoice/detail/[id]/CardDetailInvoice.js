import React, { useState } from "react";
import CardInformation from "@/components/CardInformation";

import { ConfigProvider, Form, Input, Button, Modal } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastSuccess, toastFailed } from "@/utils/toastify";

const columnCard = [
  {
    title: "Nomor Seri Pajak",
    object: "po",
    key: "fax",
  },
  {
    title: "Konfirmaasi Nomor Seri Pajak",
    object: "po",
    key: "fax",
  },
  {
    title: "Tanggal Faktur Pajak",
    object: "po",
    key: "order_date",
    dataIndex: "date",
  },
  {
    title: "Nomor Invoice Supplier",
    object: "po",
    key: "dept_code",
  },
  {
    title: "Tanggal Invoice Supplier",
    // object: "po",
    key: "tax_invoice_date",
    dataIndex: "date",
  },
];

const CardDetailInvoice = ({ data, showEditButton }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  console.log(data);

  const initialValues = {
    po_no: data?.fax,
    order_date: data?.po?.order_date,
    dept_code: data?.po?.dept_code,
    tax_invoice_date: data?.tax_invoice_date,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        po_no: Yup.string().required("Required"),
        order_date: Yup.string().required("Required"),
        dept_code: Yup.string().required("Required"),
        tax_invoice_date: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newvalues = {
            NOMOR_SERI_PAJAK: values.po_no,
            CONFIRM_N_SERI_PAJAK: values.po_no,
            TANGGAL_FAKTUR_PAJAK: values.tax_invoice_date,
            NOMOR_INVOICE_SUPPLIER: values.city,
            TANGGAL_INVOICE_SUPPLIER: values.country,
            ID: data?.id,
          };

          const res = await API.put(URL.ACTION_SAVE_INV, { id: data?.id });

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Edit Invoice Success");
            setOpen(false);
          }, 400);
        } catch (error) {
          setOpen(false);
          toastFailed("Edit Invoice Failed");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div>
          <Modal
            title="Edit Invoice"
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
                  <label htmlFor="po_no" className="min-w-44">
                    Nomor Seri Pajak
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.po_no}
                      {...formik.getFieldProps("po_no")}
                    />
                    {formik.touched.po_no && formik.errors.po_no ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.po_no}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="po_no" className="min-w-44">
                    Konfirmaasi Nomor Seri Pajak
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.po_no}
                      {...formik.getFieldProps("po_no")}
                    />
                    {formik.touched.po_no && formik.errors.po_no ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.po_no}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="order_date" className="min-w-44">
                    Tanggal Faktur Pajak
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.order_date}
                      {...formik.getFieldProps("order_date")}
                    />
                    {formik.touched.order_date && formik.errors.order_date ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.order_date}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="dept_code" className="min-w-44">
                    Nomor Invoice Supplier
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.dept_code}
                      {...formik.getFieldProps("dept_code")}
                    />
                    {formik.touched.dept_code && formik.errors.dept_code ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.dept_code}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="tax_invoice_date" className="min-w-44">
                    Tanggal Invoice Supplier
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.tax_invoice_date}
                      {...formik.getFieldProps("tax_invoice_date")}
                    />
                    {formik.touched.tax_invoice_date &&
                    formik.errors.tax_invoice_date ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.tax_invoice_date}
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            </ConfigProvider>
          </Modal>

          <CardInformation
            styleWrapper={"h-[240px]"}
            title={"Detail Invoice"}
            column={columnCard}
            data={data}
            showEditInvButton={showEditButton}
            editInvButtonAction={showModal}
            openModal={open}
          />
        </div>
      )}
    </Formik>
  );
};

export default CardDetailInvoice;
