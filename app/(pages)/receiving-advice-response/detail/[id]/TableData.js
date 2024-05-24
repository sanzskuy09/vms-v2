"use client";
import React from "react";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { ConfigProvider, Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Index",
    key: "index",
    render: (value, item, index) => index + 1,
  },
  {
    title: "Kode Barang",
    dataIndex: "product_code",
    key: "product_code",
  },
  {
    title: "Kapasitas/Barcode",
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "Nama Barang",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Gratis",
    dataIndex: "free",
    key: "free",
  },
  {
    title: "QTY Dipesan",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "QTY Konten",
    dataIndex: "qty_pack",
    key: "qty_pack",
  },
  {
    title: "Total Diterima",
    dataIndex: "total_qty",
    key: "total_qty",
  },
  {
    title: "Revised",
    dataIndex: "is_revised",
    key: "is_revised",
  },
  {
    title: "Service Level",
    dataIndex: "service_level",
    key: "service_level",
    render: (text) => <p>{text} 100.00 %</p>,
  },
  {
    title: "Keterangan",
    dataIndex: "keterangan",
    key: "keterangan",
    render: (text) => <p>{text ? text : "-"}</p>,
  },
];

const TableData = ({ loading, data }) => {
  return (
    <div>
      <div>Showing : 1 to 10 ({data?.length})</div>
      <div className="overflow-auto mt-2">
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
            pagination={false}
            loading={loading}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TableData;
