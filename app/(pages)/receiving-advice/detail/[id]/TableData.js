"use client";
import React, { useEffect, useState } from "react";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { ConfigProvider, Space, Table, Tag } from "antd";
import { API, URL } from "@/config/api";

const columns = [
  {
    title: "Index",
    key: "index",
    render: (value, item, index) => index + 1,
  },
  {
    title: "Kode Barang",
    dataIndex: "item_code",
    key: "item_code",
  },
  {
    title: "Kapasitas/Barcode",
    dataIndex: "barcode",
    key: "barcode",
    render: (_, render) => (
      <p>
        {render.capacity} / {render.barcode}
      </p>
    ),
  },
  {
    title: "Nama Barang",
    dataIndex: "item_name",
    key: "item_name",
  },
  {
    title: "Gratis",
    dataIndex: "free_qty_insku",
    key: "free_qty_insku",
  },
  {
    title: "QTY Dipesan",
    // dataIndex: "order_qty_insku",
    // key: "order_qty_insku",
    dataIndex: "received_qty",
    key: "received_qty",
    render: (_, render) => <p>{render.raipoi[0].received_qty}</p>,
  },
  {
    title: "Total Diterima",
    dataIndex: "received_qty",
    key: "received_qty",
    render: (_, render) => <p>{render.raipoi[0].received_qty}</p>,
  },
  // {
  //   title: "Revised",
  //   dataIndex: "is_revised",
  //   key: "is_revised",
  //   render: (_, render) => <p>N</p>,
  // },
  // {
  //   title: "Service Level",
  //   dataIndex: "service_level",
  //   key: "service_level",
  //   render: (text) => <p>100.00 %</p>,
  // },
];

const TableData = ({ data }) => {
  return (
    <div>
      <div>Showing : 1 to 10 ({data.length})</div>
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
    </div>
  );
};

export default TableData;
