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
    title: "Total Qty",
    dataIndex: "received_qty",
    key: "received_qty",
    render: (_, render) => <p>{render.raipoi[0].received_qty}</p>,
  },
  {
    title: "Harga Unit",
    dataIndex: "unit_price",
    key: "unit_price",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
];

const TableData = ({ data, loading }) => {
  const calculateTotalPrice = (data) => {
    return data.reduce((total, item) => {
      const qty = item.raipoi[0]?.received_qty || 0;
      const price = item.unit_price || 0;
      return total + qty * price;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(data);

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
        Total Harga : {formatToRupiah(totalPrice)}
      </div>
    </div>
  );
};

export default TableData;
