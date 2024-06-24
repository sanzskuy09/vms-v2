import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Nomor order",
    object: "po",
    key: "po_no",
  },
  {
    title: "Tanggal order",
    object: "po",
    key: "order_date",
    dataIndex: "date",
  },
  {
    title: "Kode Departemen",
    object: "po",
    key: "dept_code",
  },
  {
    title: "Kelompok Pemesanan",
    object: "po",
    key: "store_code",
  },
  {
    title: "Pengiriman Ke",
    key: "delivery_to",
    object: "po",
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
