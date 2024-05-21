"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag } from "antd";

import ICONS from "@/config/icons";

import { formatToRupiah } from "@/utils/FormatCurrency";
import dayjs from "dayjs";
import { API, URL } from "@/config/api";

const columns = [
  {
    title: "Referensi",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Merchant",
    dataIndex: "business_unit_name",
    key: "business_unit_name",
  },
  {
    title: "Nomor Order",
    dataIndex: "po_no",
    key: "po_no",
  },
  {
    title: "Tanggal Order",
    dataIndex: "order_date",
    key: "order_date",
    // render: (text) => <p>{dayjs(text).format("DD-MM-YYYY")}</p>,
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Perubahan Terakhir",
    dataIndex: "date_updated",
    key: "date_updated",
    render: (text) => {
      const formattedDate = dayjs(text).subtract(1, "day").format("DD-MM-YYYY");
      return <p>{formattedDate}</p>;
    },
  },
  {
    title: "Total Harga",
    dataIndex: "total_amount",
    key: "total_amount",
    render: (text) => <p>{formatToRupiah(text)}</p>,
  },
  {
    title: "Toko",
    dataIndex: "supplier_name",
    key: "supplier_name",
    render: (_, record) => (
      <p>{record?.dept_code + " - " + record?.supplier_name}</p>
    ),
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
        <Link href={`/purchase-order/detail/${record?.id}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const PurchaseOrder = () => {
  const [data, setData] = useState([]);

  const getDataPO = async () => {
    try {
      const res = await API.get(URL.GET_LIST_PO);

      const data = res.data.result.items;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataPO();
  }, []);

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
          <Table columns={columns} dataSource={data} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default PurchaseOrder;
