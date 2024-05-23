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
    render: (text) => <p>0.00</p>,
  },
  {
    title: "QTY Dipesan",
    dataIndex: "order_qty",
    key: "order_qty",
  },
  {
    title: "QTY Konten",
    dataIndex: "qty_pack",
    key: "qty_pack",
    render: (text) => <p>{text ? text : "-"}</p>,
  },
  {
    title: "Total Diterima",
    dataIndex: "received_qty",
    key: "received_qty",
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
    render: (text) => <p>100 %</p>,
  },
];

const TableData = ({ params }) => {
  const [data, setData] = useState([]);

  const getItemRA = async () => {
    try {
      const res = await API.get(`${URL.GET_ITEM_RA}?id=${params}`);

      // console.log(res);
      const data = res.data.result.items;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemRA();
  }, []);

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
    </div>
  );
};

export default TableData;
