"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag } from "antd";

import ICONS from "@/config/icons";

import { data } from "../proforma-invoice/data";

import dayjs from "dayjs";

const columns = [
  {
    title: "Referensi",
    dataIndex: "id",
    key: "id",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Merchant",
    dataIndex: "merchant",
    key: "merchant",
  },
  {
    title: "Tanggal Diterima",
    dataIndex: "tgl_pfi",
    key: "tgl_pfi",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Toko",
    dataIndex: "toko",
    key: "toko",
  },
  {
    title: "Revisi",
    dataIndex: "revisi",
    key: "revisi",
  },

  {
    title: "Aksi",
    key: "aksi",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/proforma-invoice-response/detail/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const ProformaInvoiceResponse = () => {
  return (
    <div>
      <h1 className="text-4xl mb-12">Proforma Invoice Response</h1>

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

export default ProformaInvoiceResponse;
