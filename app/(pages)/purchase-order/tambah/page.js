"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ConfigProvider, Form, Input } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastSuccess, toastFailed } from "@/utils/toastify";

const TambahPOPage = () => {
  const router = useRouter();

  // const initialValues = {
  //   // po
  //   id_purchase_order: "CTRI000000000024",
  //   nomor_purchase_order: "CTRI000000000024",
  //   tanggal_pengiriman: "2024-06-30",
  //   pengiriman_ke: "Alamat Pengiriman",
  //   dikirim_ke: "Jakarta",
  //   kode_pengirim: "SEN24",

  //   // supplier
  //   kode_supplier: "8330",
  //   nama_supplier: "Supplier 24",
  //   telepon: "021-7654321",
  //   telephone_fax: "021-1234567",
  //   kode_departemen: "24",
  //   nama_departemen: "Departemen 24",
  //   departemen_supplier: "3",

  //   // toko
  //   kode_toko: "24",
  //   nomor_pesanan_toko: "ORD24",
  //   kode_business_unit: "BU24",
  //   nama_business_unit: "Unit Bisnis 24",
  //   alamat_business_unit: "Alamat Bisnis",

  //   // items
  //   kode_item: "ITEM24",
  //   nama_item: "Sandal 24",
  //   nama_item_lokal: "Sandal baru",
  //   barcode: "1234567890123",
  //   harga_item: "50000",
  //   kapasitas: "100ml",
  //   jumlah: "10",
  //   nomor_garis: "1",
  //   gratis: "0",
  //   jumlah_pesanan_pack: "10",
  //   jumlah_pack: "10",
  //   jumlah_pesanan: "100",
  //   total_harga: "total_harga",
  //   pesanan_dari: "System",
  // };

  const initialValues = {
    // po
    id_purchase_order: "",
    nomor_purchase_order: "",
    tanggal_pengiriman: "",
    pengiriman_ke: "",
    dikirim_ke: "",
    kode_pengirim: "",

    // supplier
    kode_supplier: "",
    nama_supplier: "",
    telepon: "",
    telephone_fax: "",
    kode_departemen: "",
    nama_departemen: "",
    departemen_supplier: "",

    // toko
    kode_toko: "",
    nomor_pesanan_toko: "",
    kode_business_unit: "",
    nama_business_unit: "",
    alamat_business_unit: "",

    // items
    kode_item: "",
    nama_item: "",
    nama_item_lokal: "",
    barcode: "",
    harga_item: "",
    kapasitas: "",
    jumlah: "",
    nomor_garis: "",
    gratis: "0",
    jumlah_pesanan_pack: "",
    jumlah_pack: "",
    jumlah_pesanan: "",
    total_harga: "",
    pesanan_dari: "System",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        id_purchase_order: Yup.string().required("Required"),
        nomor_purchase_order: Yup.string().required("Required"),
        tanggal_pengiriman: Yup.string().required("Required"),
        pengiriman_ke: Yup.string().required("Required"),
        kode_pengirim: Yup.string().required("Required"),

        kode_supplier: Yup.string().required("Required"),
        nama_supplier: Yup.string().required("Required"),
        telepon: Yup.string().required("Required"),
        telephone_fax: Yup.string().required("Required"),
        kode_departemen: Yup.string().required("Required"),
        nama_departemen: Yup.string().required("Required"),
        departemen_supplier: Yup.string().required("Required"),

        kode_toko: Yup.string().required("Required"),
        nomor_pesanan_toko: Yup.string().required("Required"),
        kode_business_unit: Yup.string().required("Required"),
        nama_business_unit: Yup.string().required("Required"),
        alamat_business_unit: Yup.string().required("Required"),

        kode_item: Yup.string().required("Required"),
        nama_item: Yup.string().required("Required"),
        nama_item_lokal: Yup.string().required("Required"),
        barcode: Yup.string().required("Required"),
        harga_item: Yup.string().required("Required"),
        kapasitas: Yup.string().required("Required"),
        jumlah: Yup.string().required("Required"),
        nomor_garis: Yup.string().required("Required"),
        gratis: Yup.string().required("Required"),
        jumlah_pesanan_pack: Yup.string().required("Required"),
        jumlah_pack: Yup.string().required("Required"),
        jumlah_pesanan: Yup.string().required("Required"),
        total_harga: Yup.string().required("Required"),
        pesanan_dari: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newValues = {
            // po
            id_purchase_order: values.id_purchase_order,
            nomor_purchase_order: values.nomor_purchase_order,
            tanggal_pengiriman: values.tanggal_pengiriman,
            pengiriman_ke: values.pengiriman_ke,
            kode_pengirim: values.kode_pengirim,

            // supplier
            kode_supplier: values.kode_supplier,
            nama_supplier: values.nama_supplier,
            telepon: values.telepon,
            telephone_fax: values.telephone_fax,
            kode_departemen: values.kode_departemen,
            nama_departemen: values.nama_departemen,
            departemen_supplier: values.departemen_supplier,

            // toko
            kode_toko: values.kode_toko,
            nomor_pesanan_toko: values.nomor_pesanan_toko,
            kode_business_unit: values.kode_business_unit,
            nama_business_unit: values.nama_business_unit,
            alamat_business_unit: values.alamat_business_unit,

            items: [
              {
                kode_item: values.kode_item,
                nama_item: values.nama_item,
                nama_item_lokal: values.nama_item_lokal,
                barcode: values.barcode,
                harga_item: values.harga_item,
                kapasitas: values.kapasitas,
                jumlah: values.jumlah,
                nomor_garis: values.nomor_garis,
                gratis: values.gratis,
                jumlah_pesanan_pack: values.jumlah_pesanan_pack,
                jumlah_pack: values.jumlah_pack,
                jumlah_pesanan: values.jumlah_pesanan,
                total_harga: values.total_harga,
                pesanan_dari: values.pesanan_dari,
              },
            ],
          };

          console.log(newValues);

          const res = await API.post(URL.CREATE_PO, newValues);

          console.log(res);
          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Create Purchase Order Success");
            router.push("/purchase-order");
          }, 400);
        } catch (error) {
          toastFailed("Create Purchase Order Failed");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div>
          <h1 className="text-4xl mb-12">Form Create Purchase Order</h1>

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
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  {/* left side */}
                  <div className="flex flex-col gap-8">
                    <h1 className="font-bold">Purchase Order</h1>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_lokal" className="min-w-44">
                        Purchase Order
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.id_purchase_order}
                          {...formik.getFieldProps("id_purchase_order")}
                        />
                        {formik.touched.id_purchase_order &&
                        formik.errors.id_purchase_order ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.id_purchase_order}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="nama_perusahaan" className="min-w-44">
                        Nomor Purchase Order
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nomor_purchase_order}
                          {...formik.getFieldProps("nomor_purchase_order")}
                        />
                        {formik.touched.nomor_purchase_order &&
                        formik.errors.nomor_purchase_order ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nomor_purchase_order}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Tanggal Pengiriman
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.tanggal_pengiriman}
                          {...formik.getFieldProps("tanggal_pengiriman")}
                        />
                        {formik.touched.tanggal_pengiriman &&
                        formik.errors.tanggal_pengiriman ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.tanggal_pengiriman}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Alamat Pengiriman
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.pengiriman_ke}
                          {...formik.getFieldProps("pengiriman_ke")}
                        />
                        {formik.touched.pengiriman_ke &&
                        formik.errors.pengiriman_ke ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.pengiriman_ke}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Dikirim Ke
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.dikirim_ke}
                          {...formik.getFieldProps("dikirim_ke")}
                        />
                        {formik.touched.dikirim_ke &&
                        formik.errors.dikirim_ke ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.dikirim_ke}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Pengiriman
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_pengirim}
                          {...formik.getFieldProps("kode_pengirim")}
                        />
                        {formik.touched.kode_pengirim &&
                        formik.errors.kode_pengirim ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kode_pengirim}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Supplier */}
                    <h1 className="font-bold">Supplier</h1>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Supplier
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
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

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nama Supplier
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_supplier}
                          {...formik.getFieldProps("nama_supplier")}
                        />
                        {formik.touched.nama_supplier &&
                        formik.errors.nama_supplier ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nama_supplier}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nomor Telepon
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.telepon}
                          {...formik.getFieldProps("telepon")}
                        />
                        {formik.touched.telepon && formik.errors.telepon ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.telepon}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Fax
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.telephone_fax}
                          {...formik.getFieldProps("telephone_fax")}
                        />
                        {formik.touched.telephone_fax &&
                        formik.errors.telephone_fax ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.telephone_fax}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Departemen
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_departemen}
                          {...formik.getFieldProps("kode_departemen")}
                        />
                        {formik.touched.kode_departemen &&
                        formik.errors.kode_departemen ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kode_departemen}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nama Departemen
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_departemen}
                          {...formik.getFieldProps("nama_departemen")}
                        />
                        {formik.touched.nama_departemen &&
                        formik.errors.nama_departemen ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nama_departemen}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Departemen Supplier
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.departemen_supplier}
                          {...formik.getFieldProps("departemen_supplier")}
                        />
                        {formik.touched.departemen_supplier &&
                        formik.errors.departemen_supplier ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.departemen_supplier}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Toko */}
                    <h1 className="font-bold">Toko</h1>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Toko
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_toko}
                          {...formik.getFieldProps("kode_toko")}
                        />
                        {formik.touched.kode_toko && formik.errors.kode_toko ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kode_toko}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nomor Pesanan Toko
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nomor_pesanan_toko}
                          {...formik.getFieldProps("nomor_pesanan_toko")}
                        />
                        {formik.touched.nomor_pesanan_toko &&
                        formik.errors.nomor_pesanan_toko ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nomor_pesanan_toko}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Bisnis Unit
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_business_unit}
                          {...formik.getFieldProps("kode_business_unit")}
                        />
                        {formik.touched.kode_business_unit &&
                        formik.errors.kode_business_unit ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kode_business_unit}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* right side */}
                  <div className="flex flex-col gap-8">
                    <h1 className="font-bold">Item</h1>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kode Item
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kode_item}
                          {...formik.getFieldProps("kode_item")}
                        />
                        {formik.touched.kode_item && formik.errors.kode_item ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kode_item}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nama Item
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_item}
                          {...formik.getFieldProps("nama_item")}
                        />
                        {formik.touched.nama_item && formik.errors.nama_item ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nama_item}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nama Item Lokal
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_item_lokal}
                          {...formik.getFieldProps("nama_item_lokal")}
                        />
                        {formik.touched.nama_item_lokal &&
                        formik.errors.nama_item_lokal ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nama_item_lokal}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Barcode
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.barcode}
                          {...formik.getFieldProps("barcode")}
                        />
                        {formik.touched.barcode && formik.errors.barcode ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.barcode}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Harga Item
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.harga_item}
                          {...formik.getFieldProps("harga_item")}
                        />
                        {formik.touched.harga_item &&
                        formik.errors.harga_item ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.harga_item}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Kapasitas
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.kapasitas}
                          {...formik.getFieldProps("kapasitas")}
                        />
                        {formik.touched.kapasitas && formik.errors.kapasitas ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.kapasitas}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Jumlah Item
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.jumlah}
                          {...formik.getFieldProps("jumlah")}
                        />
                        {formik.touched.jumlah && formik.errors.jumlah ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.jumlah}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nomor Urut
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nomor_garis}
                          {...formik.getFieldProps("nomor_garis")}
                        />
                        {formik.touched.nomor_garis &&
                        formik.errors.nomor_garis ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nomor_garis}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Promosi/Gratis
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.gratis}
                          {...formik.getFieldProps("gratis")}
                        />
                        {formik.touched.gratis && formik.errors.gratis ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.gratis}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Jumlah Per Pack
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.jumlah_pesanan_pack}
                          {...formik.getFieldProps("jumlah_pesanan_pack")}
                        />
                        {formik.touched.jumlah_pesanan_pack &&
                        formik.errors.jumlah_pesanan_pack ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.jumlah_pesanan_pack}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Jumlah Pack
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.jumlah_pack}
                          {...formik.getFieldProps("jumlah_pack")}
                        />
                        {formik.touched.jumlah_pack &&
                        formik.errors.jumlah_pack ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.jumlah_pack}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Jumlah Barang SKU
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.jumlah_pesanan}
                          {...formik.getFieldProps("jumlah_pesanan")}
                        />
                        {formik.touched.jumlah_pesanan &&
                        formik.errors.jumlah_pesanan ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.jumlah_pesanan}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Total Harga
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.total_harga}
                          {...formik.getFieldProps("total_harga")}
                        />
                        {formik.touched.total_harga &&
                        formik.errors.total_harga ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.total_harga}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Pesanan Dari
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.pesanan_dari}
                          {...formik.getFieldProps("pesanan_dari")}
                        />
                        {formik.touched.pesanan_dari &&
                        formik.errors.pesanan_dari ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.pesanan_dari}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="invisible h-4">p</div>
                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Nama Business Unit
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.nama_business_unit}
                          {...formik.getFieldProps("nama_business_unit")}
                        />
                        {formik.touched.nama_business_unit &&
                        formik.errors.nama_business_unit ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.nama_business_unit}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <label htmlFor="" className="min-w-44">
                        Alamat Business Unit
                      </label>
                      <p>:</p>
                      <div className="flex flex-col w-full">
                        <Input
                          placeholder=""
                          size="large"
                          value={formik.values.alamat_business_unit}
                          {...formik.getFieldProps("alamat_business_unit")}
                        />
                        {formik.touched.alamat_business_unit &&
                        formik.errors.alamat_business_unit ? (
                          <div className="text-red-600 text-[10px]">
                            {formik.errors.alamat_business_unit}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex justify-end items-center ">
                      <button
                        type="submit"
                        className="bg-primary px-8 py-1 rounded-sm font-medium shadow-lg text-white"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </ConfigProvider>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TambahPOPage;
