import React from "react";
import CardInformation from "@/components/CardInformation";
import dayjs from "dayjs";

const columnCard = [
  {
    title: "Nomor order",
    object: "rapo",
    key: "po_no",
  },
  {
    title: "Tanggal order",
    object: "rapo",
    key: "order_date",
    dataIndex: "date",
  },
  {
    title: "Kode Departemen",
    object: "rapo",
    key: "dept_code",
  },
  {
    title: "Kelompok Pemesanan",
    object: "rapo",
    key: "store_code",
  },
  {
    title: "Pengiriman Ke",
    key: "delivery_to",
    object: "rapo",
  },
  {
    title: "Kode Penerima ",
    key: "receiver_code",
  },
];

const columnCard2 = [
  {
    title: "Nomor ra",
    key: "receiving_advice_number",
  },
  {
    title: "Tanggal ra",
    dataIndex: "date",
    key: "receiving_advice_date",
  },
];

const CardInfoOrder = ({ data }) => {
  // console.log(data);
  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        column={columnCard}
        data={data}
        title2={"Informasi RA"}
        column2={columnCard2}
        data2={data}
      />
    </div>
  );
};

export default CardInfoOrder;
