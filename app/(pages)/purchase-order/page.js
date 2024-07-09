"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag, Select } from "antd";

import ICONS from "@/config/icons";

import { formatToRupiah } from "@/utils/FormatCurrency";
import dayjs from "dayjs";
import { API, URL } from "@/config/api";

const columns = [
  {
    title: "Referensi",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Merchant",
    dataIndex: "business_unit_name",
    key: "business_unit_name",
  },
  {
    title: "Nomor Order",
    dataIndex: "po_no",
    key: "po_no",
  },
  {
    title: "Tanggal Order",
    dataIndex: "order_date",
    key: "order_date",
    // render: (text) => <p>{dayjs(text).format("DD-MM-YYYY")}</p>,
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Perubahan Terakhir",
    dataIndex: "date_updated",
    key: "date_updated",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Total Harga",
    dataIndex: "total_amount",
    key: "total_amount",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
  {
    title: "Toko",
    dataIndex: "supplier_name",
    key: "supplier_name",
    render: (_, record) => (
      <p>{record?.dept_code + " - " + record?.supplier_name}</p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <p className="font-semibold">{text}</p>,
  },

  {
    title: "Aksi",
    key: "aksi",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/purchase-order/detail/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const optionsStatus = [
  { label: "Pilih Status", value: "" },
  { label: "Draft", value: "DRAFT" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Payment Transit", value: "PAYMENT_IN_TRANSIT" },
  { label: "Telah Dibuat", value: "INV_CREATED" },
  { label: "Menunggu Respon", value: "AWAITING_ACTION" },
];
const optionsDept = [
  { label: "Pilih Bussines Unit", value: "" },
  { label: "jakarta", value: "jakarta" },
  { label: "bandung", value: "bandung" },
];

const PurchaseOrder = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState({ status: "", business_unit_name: "" });

  const getDataPO = async () => {
    try {
      const res = await API.get(
        `${URL.GET_FILTER_PO}?status=${search.status}&business_unit_name=${search.business_unit_name}`
      );

      const data = res.data.result.items;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPO();
  }, []);

  const handleChange = (value, type) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [type]: value.value,
    }));
  };

  const handleReset = async () => {
    setSearch({ status: "", business_unit_name: "" });

    const res = await API.get(
      `${URL.GET_FILTER_PO}?status=&business_unit_name=`
    );

    const data = res.data.result.items;
    setData(data);
  };

  // console.log(search);

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl">Purchase Order</h1>
        <Link
          href={"/purchase-order/tambah"}
          className="px-4 py-2 bg-primary rounded-md text-white"
        >
          Tambah PO
        </Link>
      </div>
      {/* seacrh */}
      <div className="bg-secondary min-h-[150px] rounded-md mb-8 py-10 px-16">
        <div className="flex flex-wrap gap-16 justify-end">
          <div>
            <label htmlFor="status">Status : </label>
            <Select
              labelInValue
              // defaultValue={{ value: "" }}
              value={search.status ? { value: search.status } : ""}
              style={{ width: 250 }}
              onChange={(value) => handleChange(value, "status")}
              options={optionsStatus}
            />
          </div>

          <div>
            <label htmlFor="tgl-order">Tanggal Order : </label>
            <Select
              labelInValue
              defaultValue={{ value: "" }}
              style={{ width: 250 }}
              // onChange={(value) => handleChange(value, "dept")}
              options={optionsDept}
            />
          </div>

          <div>
            <label htmlFor="bussines">Bussines Unit : </label>
            <Select
              labelInValue
              // defaultValue={{ value: "" }}
              value={
                search.business_unit_name
                  ? { value: search.business_unit_name }
                  : ""
              }
              style={{ width: 250 }}
              onChange={(value) => handleChange(value, "business_unit_name")}
              options={optionsDept}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={getDataPO}
            className="px-4 py-1 bg-primary rounded-md shadow-lg text-white"
          >
            Cari
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-1 bg-white rounded-md text-black shadow-lg"
          >
            Reset
          </button>
        </div>

        {/* <div>
          Selected Status: {search.status}, Selected Department: {search.dept}
        </div> */}
      </div>

      <div className="overflow-auto">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorPrimary: "#ED1B24",
                headerColor: "#fff",
                headerBg: "#ED1B24",
                headerBorderRadius: 0,
                algorithm: true,
                // borderColor: "#000",
              },
              Pagination: {
                colorPrimary: "#ED1B24",
                colorPrimaryHover: "#ED1B24",
                colorPrimaryBorder: "#ED1B24",
                algorithm: true,
              },
            },
          }}
        >
          <Table columns={columns} dataSource={data} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default PurchaseOrder;
