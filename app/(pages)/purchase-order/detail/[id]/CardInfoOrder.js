import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Informasi Pengirim",
    key: "info_pengirim",
  },
  {
    title: "Kode Departemen",
    key: "dept_code",
  },
  {
    title: "Pengiriman Ke",
    key: "send_to",
  },
  {
    title: "Nomor Order",
    key: "no_order",
  },
  {
    title: "Tanggal Order",
    key: "tgl_order",
  },
  {
    title: "Tanggal Penerimaan",
    key: "tgl_received",
  },
  {
    title: "NPWP",
    key: "npwp",
  },
  {
    title: "Alamat Perusahaan",
    key: "pt_address",
  },
  {
    title: "Kode Toko",
    key: "store_code",
  },
];

const data = {
  info_pengirim: "87573829923455",
  dept_code: "24, Butchery",
  send_to: "Kelapa Gading",
  no_order: "915003095",
  tgl_order: "Kamis, 15 Januari 2015, 15:29",
  tgl_received: "Kamis, 15 Januari 2015, 18:00",
  npwp: "1115001435",
  pt_address: "Jl. Lebak bulus No. 8 Gedung Carrefour Kebayoran Lama",
  store_code: "",
};
const CardInfoOrder = () => {
  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        subTitle={"KELAPA GADING"}
        column={columnCard}
        data={data}
      />
    </div>
  );
};

export default CardInfoOrder;
