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
    key: "tax_serial_number",
  },
  {
    title: "Konfirmasi Nomor Seri Pajak",
    key: "tax_serial_number",
  },
  {
    title: "Tanggal Faktur Pajak",
    key: "tax_invoice_date",
    dataIndex: "date",
  },
  {
    title: "Nomor Invoice Supplier",
    key: "invoice_id",
  },
  {
    title: "Tanggal Invoice Supplier",
    // object: "po",
    key: "invoice_date",
    dataIndex: "date",
  },
];

const CardDetailInvoice = ({ data, setData, showEditButton }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const initialValues = {
    tax_serial_number: data?.tax_serial_number,
    konfirmasi_tax_serial_number: data?.tax_serial_number,
    tax_invoice_date: data?.tax_invoice_date,
    invoice_id: data?.invoice_id,
    invoice_date: data?.invoice_date,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        tax_serial_number: Yup.string().required("Required"),
        konfirmasi_tax_serial_number: Yup.string().required("Required"),
        tax_invoice_date: Yup.string().required("Required"),
        invoice_id: Yup.string().required("Required"),
        invoice_date: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newvalues = {
            NOMOR_SERI_PAJAK: values.tax_serial_number,
            CONFIRM_N_SERI_PAJAK: values.konfirmasi_tax_serial_number,
            TANGGAL_FAKTUR_PAJAK: values.tax_invoice_date,
            NOMOR_INVOICE_SUPPLIER: values.invoice_id,
            TANGGAL_INVOICE_SUPPLIER: values.invoice_date,
            ID: data?.id,
          };

          if (
            values.tax_serial_number !== values.konfirmasi_tax_serial_number
          ) {
            toastFailed("Konfirmasi Nomor Seri Pajak Tidak Sesuai");
            resetForm();
            setSubmitting(false);
            setOpen(false);
            return false;
          }

          const res = await API.put(URL.ACTION_SAVE_INV, newvalues);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Edit Invoice Success");
            setData();
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
                  <label htmlFor="tax_serial_number" className="min-w-44">
                    Nomor Seri Pajak
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.tax_serial_number}
                      {...formik.getFieldProps("tax_serial_number")}
                    />
                    {formik.touched.tax_serial_number &&
                    formik.errors.tax_serial_number ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.tax_serial_number}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label
                    htmlFor="konfirmasi_tax_serial_number"
                    className="min-w-44"
                  >
                    Konfirmasi Nomor Seri Pajak
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.konfirmasi_tax_serial_number}
                      {...formik.getFieldProps("konfirmasi_tax_serial_number")}
                    />
                    {formik.touched.konfirmasi_tax_serial_number &&
                    formik.errors.konfirmasi_tax_serial_number ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.konfirmasi_tax_serial_number}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="tax_invoice_date" className="min-w-44">
                    Tanggal Faktur Pajak
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

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="invoice_id" className="min-w-44">
                    Nomor Invoice Supplier
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.invoice_id}
                      {...formik.getFieldProps("invoice_id")}
                    />
                    {formik.touched.invoice_id && formik.errors.invoice_id ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.invoice_id}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-auto">
                  <label htmlFor="invoice_date" className="min-w-44">
                    Tanggal Invoice Supplier
                  </label>
                  <p>:</p>
                  <div className="flex flex-col w-full">
                    <Input
                      size="large"
                      value={formik.values.invoice_date}
                      {...formik.getFieldProps("invoice_date")}
                    />
                    {formik.touched.invoice_date &&
                    formik.errors.invoice_date ? (
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.invoice_date}
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
