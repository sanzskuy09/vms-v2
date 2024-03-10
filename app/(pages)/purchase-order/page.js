"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag } from "antd";

import ICONS from "@/config/icons";

import { data } from "./data";

import { formatToRupiah } from "@/utils/FormatCurrency";
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
    title: "Nomor Order",
    dataIndex: "nomor_order",
    key: "nomor_order",
  },
  {
    title: "Tanggal Order",
    dataIndex: "tgl_order",
    key: "tgl_order",
    // render: (text) => <p>{dayjs(text).format("DD-MM-YYYY")}</p>,
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Perubahan Terakhir",
    dataIndex: "last_updated",
    key: "last_updated",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Total Harga",
    dataIndex: "total_harga",
    key: "total_harga",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
  {
    title: "Toko",
    dataIndex: "toko",
    key: "toko",
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
        <Link href={`/purchase-order/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const PurchaseOrder = () => {
  return (
    <div>
      <h1 className="text-4xl mb-12">Purchase Order</h1>

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

export default PurchaseOrder;
