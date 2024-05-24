import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Nomor order",
    key: "ref_po_no",
  },
  {
    title: "Tanggal order",
    key: "tgl_order",
  },
  {
    title: "Kode Departemen",
    key: "dept_code",
  },
  {
    title: "Kelompok Pemesanan",
    key: "order",
  },
  {
    title: "Pengiriman Ke",
    key: "sent_to",
  },
  {
    title: "Kode Penerima ",
    key: "receiver_code",
  },
];

const columnCard2 = [
  {
    title: "Nomor order",
    key: "no_order_ra",
  },
  {
    title: "Tanggal order",
    key: "tgl_order_ra",
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
