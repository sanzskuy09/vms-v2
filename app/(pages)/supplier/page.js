"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ConfigProvider, Space, Table, Tag } from "antd";

import ICONS from "@/config/icons";

import { API, URL } from "@/config/api";

const columns = [
  {
    title: "Kode Supplier",
    dataIndex: "supplier_code",
    key: "supplier_code",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Nama Lokal",
    dataIndex: "local_name",
    key: "local_name",
  },
  {
    title: "ID Pajak",
    dataIndex: "tax_id",
    key: "tax_id",
  },
  {
    title: "Aksi",
    key: "aksi",
    align: "center",
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/supplier/detail/${record?.supplier_code}`}>
          <Image src={ICONS.IC_SHOW_GREY} alt="show-icon" />
        </Link>
      </Space>
    ),
  },
];

const SupplierPage = () => {
  const [data, setData] = useState([]);

  const getDataSUPP = async () => {
    try {
      const res = await API.get(URL.GET_LIST_SUPP);

      const data = res.data.result;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataSUPP();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl">Supplier</h1>

        <Link href="/supplier/tambah">
          <button className="py-2 px-4 bg-primary rounded-md text-white hover:opacity-80">
            Tambah Supplier
          </button>
        </Link>
      </div>

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

export default SupplierPage;
