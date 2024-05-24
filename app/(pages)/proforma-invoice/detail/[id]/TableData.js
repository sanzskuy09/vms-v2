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
    title: "Total Qty",
    dataIndex: "total_qty",
    key: "total_qty",
  },
  {
    title: "Harga Unit",
    dataIndex: "price",
    key: "price",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
  {
    title: "Dicocokkan",
    dataIndex: "service_level",
    key: "service_level",
    render: (text) => <p> 100.00 %</p>,
  },
  {
    title: "Keterangan",
    dataIndex: "ket",
    key: "ket",
    render: (text) => <p> {text ? text : "-"}</p>,
  },
];

const TableData = ({ data, loading }) => {
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
      <div className="text-end font-semibold mt-4">
        Total Harga : {formatToRupiah(1734000)}
      </div>
    </div>
  );
};

export default TableData;
