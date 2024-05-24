"use client";
import React from "react";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { ConfigProvider, Space, Table, Tag } from "antd";

const columns = [
  {
    title: "No",
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
    title: "QTY order",
    dataIndex: "order_qty_insku",
    key: "order_qty_insku",
  },
  {
    title: "QTY/Pack",
    dataIndex: "order_qty_in_pack",
    key: "order_qty_in_pack",
  },
  {
    title: "Total Qty",
    dataIndex: "qty_per_pack",
    key: "order_qty_insku",
  },
  {
    title: "Harga Unit",
    dataIndex: "unit_price",
    key: "unit_price",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
];

const TableData = ({ data }) => {
  const getTotalPrice = (data) => {
    let total = 0;

    data.forEach((item) => {
      total += item.unit_price * item.order_qty_insku;
    });

    return formatToRupiah(total);
  };
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
      <div className="text-end font-semibold mt-4">
        Total Harga : {getTotalPrice(data)}
        {/* {formatToRupiah(parseInt(data.order_qty_insku) * data.unit_price)} */}
      </div>
    </div>
  );
};

export default TableData;
