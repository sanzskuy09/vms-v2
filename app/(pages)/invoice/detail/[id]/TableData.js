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
    dataIndex: "total_qty",
    key: "total_qty",
    render: (_, render) => <p>{render.invpoi[0].total_qty}</p>,
  },
  {
    title: "Harga sebelum pajak",
    render: (_, render) => <p>{formatToRupiah(render.invpoi[0].unit_price)}</p>,
  },
  {
    title: "Pajak",
    dataIndex: "tax_percentage",
    key: "tax_percentage",
    render: (_, render) => <p>{render.invpoi[0].tax_percentage}</p>,
  },
  {
    title: "Harga setelah pajak",
    render: (_, render) => (
      <p>
        {formatToRupiah(
          render.invpoi[0].unit_price * render.invpoi[0].total_qty
        )}
      </p>
    ),
  },
  {
    title: "Harga Unit",
    dataIndex: "unit_price",
    key: "unit_price",
    render: (_, render) => <p>{formatToRupiah(render.invpoi[0].unit_price)}</p>,
  },
];

// const data = [
//   {
//     product_code: "901822",
//     barcode: "5 kg/202685000000",
//     product_name: "CHICKEN NUGGET 5KG",
//     qty: 25,
//     qty_pack: 1,
//     total_qty: 25,
//     price: 1765300,
//     id: "9074816389098",
//   },
// ];

const TableData = ({ data, loading }) => {
  console.log(data);
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
