"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag } from "antd";

import ICONS from "@/config/icons";

import { data } from "./data";

import { formatToRupiah } from "@/utils/FormatCurrency";
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
    title: "Revisi",
    dataIndex: "revision",
    key: "revision",
  },
  {
    title: "Nomor Seri Pajak",
    dataIndex: "tax_serial_number",
    key: "tax_serial_number",
  },
  {
    title: "Tanggal Ubah",
    dataIndex: "date_updated",
    key: "date_updated",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Tanggal Faktur pajak",
    dataIndex: "tax_invoice_date",
    key: "tax_invoice_date",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Total Sebelum pajak",
    dataIndex: "harga_sesudah_pajak",
    key: "harga_sesudah_pajak",
    render: (text) => <p>{formatToRupiah(text)}</p>,
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
        <Link href={`/invoice/detail/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const Invoice = () => {
  const [data, setData] = useState([]);

  const getDataINV = async () => {
    try {
      const res = await API.get(URL.GET_LIST_INV);

      const data = res.data.result.items;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataINV();
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-12">Invoice</h1>

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

export default Invoice;
