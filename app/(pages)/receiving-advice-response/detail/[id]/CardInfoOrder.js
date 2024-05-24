import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Nomor order",
    key: "no_order",
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
    key: "receiving_code",
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

const data = {
  no_order: "915003095",
  tgl_order: "Kamis, 15 Januari 2015, 15:29",
  dept_code: 24,
  order: "064",
  sent_to: "Supermall Karawaci",
  receiving_code: "1115001435",
};

const data2 = {
  no_order_ra: "915003095",
  tgl_order_ra: "Kamis, 15 Januari 2015, 15:29",
};

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
