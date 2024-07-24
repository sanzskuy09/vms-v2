"use client";
import React, { useEffect, useRef, useState } from "react";

import { formatToRupiah } from "@/utils/FormatCurrency";

import { ConfigProvider, Space, Table, Input, Form } from "antd";
import { API, URL } from "@/config/api";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(record?.[dataIndex]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async () => {
    toggleEdit();
    handleSave({ ...record, [dataIndex]: value });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <td {...restProps}>
      {editable ? (
        editing ? (
          <Input
            value={value}
            onChange={handleChange}
            onBlur={save}
            onPressEnter={save}
          />
        ) : (
          <div onClick={toggleEdit}>{children}</div>
        )
      ) : (
        children
      )}
    </td>
  );
};

const TableData = ({ data, setData, loading, fecthData }) => {
  const handleSave = async (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });

      try {
        await API.put(URL.EDIT_ITEM_PFIR, {
          RAIID: row.raipoi[0].id,
          RECONCILED: row.reconciled,
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }

      fecthData();
      setData(newData);
    } else {
      newData.push(row);
      setData(newData);
    }
  };

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
      title: "Diterima",
      dataIndex: "is_accepted",
      key: "is_accepted",
      render: (_, render) => <p>{render.raipoi[0].raipfii[0].is_accepted}</p>,
    },
    {
      title: "Harga Unit",
      dataIndex: "reconciled",
      key: "reconciled",
      editable: true,
      render: (_, render) => (
        <p>{formatToRupiah(render.raipoi[0].raipfii[0].reconciled)}</p>
      ),
    },
    {
      title: "Keterangan",
      dataIndex: "remark",
      key: "remark",
      render: (text) => <p> {text ? text : "-"}</p>,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const calculateTotalPrice = (data) => {
    return data.reduce((total, item) => {
      const qty = item.raipoi[0]?.received_qty || 0;
      const price = item.raipoi[0].raipfii[0].reconciled || 0;
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
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
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
