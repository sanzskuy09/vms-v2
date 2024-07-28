"use client";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;

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
    render: (text) => {
      const formattedDate = dayjs(text).format("DD-MM-YYYY");
      // const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Perubahan Terakhir",
    dataIndex: "expected_delivery_date",
    key: "expected_delivery_date",
    render: (text) => {
      const formattedDate = dayjs(text).format("DD-MM-YYYY");
      // const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
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
      <p>{record?.store_code + " - " + record?.supplier_name}</p>
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
  { label: "New", value: "NEW" },
  { label: "Accepted", value: "accepted" },
  { label: "RA Created", value: "ra_created" },
  { label: "RA Litigation", value: "ra_litigation" },
  { label: "PFI Created", value: "pfi_created" },
  { label: "PFI Litigation", value: "pfi_litigation" },
  { label: "INV Created", value: "inv_created" },
];

const PurchaseOrder = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const username = localStorage.getItem("username") || "";

  const dateFormat = "DD/MM/YYYY";

  const [search, setSearch] = useState({
    status: "",
    start_date: "",
    end_date: "",
  });
  const [dateRange, setDateRange] = useState([]);

  const getDataPO = async () => {
    try {
      const res = await API.get(
        `${URL.GET_LIST_PO}?supplier_code=${
          username !== "admin" ? username : ""
        }&status=${search.status}&start_date=${search.start_date}&end_date=${
          search.end_date
        }`
      );

      const data = res.data.result.items;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value, type) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [type]: value.value,
    }));
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      start_date: dateStrings[0],
      end_date: dateStrings[1],
    }));
    setDateRange(dates);
  };

  const handleReset = async () => {
    setSearch({ status: "", start_date: "", end_date: "" });
    setDateRange([]);

    const res = await API.get(
      `${URL.GET_LIST_PO}?supplier_code=${username !== "admin" ? username : ""}`
    );

    const data = res.data.result.items;
    setData(data);
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "Admin";
    setUser(username);

    getDataPO();
  }, []);

  // console.log(search);

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl">Purchase Order</h1>

        {user == "admin" && (
          <Link
            href={"/purchase-order/tambah"}
            className="px-4 py-2 bg-primary rounded-md text-white"
          >
            Tambah PO
          </Link>
        )}
      </div>
      {/* seacrh */}
      <div className="bg-secondary min-h-[150px] rounded-md mb-8 py-10 px-16">
        <div className="flex gap-16 justify-end">
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
            <RangePicker value={dateRange} onChange={handleDateRangeChange} />
          </div>

          <div className="flex gap-4">
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
        </div>
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
