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
    render: (text) => <p>{text} %</p>,
  },
  {
    title: "Keterangan",
    dataIndex: "ket",
    key: "ket",
  },
];

const data = [
  {
    product_code: "901822",
    barcode: "5 kg/202685000000",
    product_name: "CHICKEN NUGGET 5KG",
    total_qty: 25,
    price: 100000,
    service_level: 100,
    ket: "N",
    id: "9074816389098",
  },
];

const TableData = () => {
  return (
    <div>
      <div>Showing : 1 to 10 (95)</div>
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
          <Table columns={columns} dataSource={data} pagination={false} />
        </ConfigProvider>
      </div>
      <div className="text-end font-semibold mt-4">
        Total Harga : {formatToRupiah(1734000)}
      </div>
    </div>
  );
};

export default TableData;
