import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Informasi Pengirim",
    key: "sender_code",
  },
  {
    title: "Kode Departemen",
    key: "dept_code",
  },
  {
    title: "Pengiriman Ke",
    key: "delivery_to",
  },
  {
    title: "Nomor Order",
    key: "po_no",
  },
  {
    title: "Tanggal Order",
    key: "order_date",
    dataIndex: "date",
  },
  {
    title: "Tanggal Penerimaan",
    key: "expected_delivery_date",
    dataIndex: "date",
  },
  // {
  //   title: "NPWP",
  //   key: "npwp",
  // },
  {
    title: "Alamat Perusahaan",
    key: "business_unit_address",
  },
  {
    title: "Kode Toko",
    key: "store_code",
  },
];

const CardInfoOrder = ({ data }) => {
  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        subTitle={data?.delivery_to?.toUpperCase()}
        column={columnCard}
        data={data}
      />
    </div>
  );
};

export default CardInfoOrder;
