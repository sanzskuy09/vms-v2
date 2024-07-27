"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;

import ICONS from "@/config/icons";

import dayjs from "dayjs";

import { API, URL } from "@/config/api";

const columns = [
  {
    title: "Referensi",
    dataIndex: "id",
    key: "id",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Merchant",
    dataIndex: "supplier_name",
    key: "supplier_name",
  },
  {
    title: "Nomor RA",
    dataIndex: "receiving_advice_number",
    key: "receiving_advice_number",
  },
  {
    title: "Tanggal RA",
    dataIndex: "receiving_advice_date",
    key: "receiving_advice_date",
    render: (text) => {
      const formattedDate = dayjs(text).format("DD-MM-YYYY");
      // const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Toko",
    dataIndex: "store",
    key: "store",
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
        <Link href={`/receiving-advice/detail/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const optionsStatus = [
  { label: "Pilih Status", value: "" },
  { label: "New", value: "new" },
  { label: "Awaiting Action", value: "awaiting_action" },
  { label: "Rejected", value: "rejected" },
  { label: "RA Created", value: "ra_created" },
  { label: "RA Litigation", value: "ra_litigation" },
  { label: "PFI Created", value: "pfi_created" },
  { label: "PFI Litigation", value: "pfi_litigation" },
  { label: "INV Created", value: "inv_created" },
];

const ReceivingAdvice = () => {
  const username = localStorage.getItem("username") || "";
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    status: "",
    start_date: "",
    end_date: "",
  });
  const [dateRange, setDateRange] = useState([]);

  const getDataRA = async () => {
    try {
      const res = await API.get(
        `${URL.GET_LIST_RA}?supplier_code=${
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

  useEffect(() => {
    getDataRA();
  }, []);

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

    // const res = await API.get(
    //   `${URL.GET_FILTER_PO}?status=&start_date=&end_date=`
    // );
    const res = await API.get(
      URL.GET_LIST_RA + `?supplier_code=${username !== "admin" ? username : ""}`
    );

    const data = res.data.result.items;
    setData(data);
  };

  return (
    <div>
      <h1 className="text-4xl mb-12">Receiving Advice</h1>

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
              onClick={getDataRA}
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
          <Table
            columns={columns}
            dataSource={data}
            // pagination={{
            //   showSizeChanger: true,
            //   pageSizeOptions: ["10", "20", "50"],
            // }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ReceivingAdvice;
