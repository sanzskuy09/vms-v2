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
    title: "Toko Transmart",
    key: "store",
  },
  {
    title: "Nama Perusahaan",
    key: "pt_name",
  },
  {
    title: "Tanggal Penerimaan",
    key: "tgl_received",
  },
  {
    title: "Alamat Perusahaan",
    key: "address_store",
  },
  {
    title: "NPWP",
    key: "npwp_store",
  },
];

const data = {
  no_order: "915003095",
  tgl_order: "Kamis, 15 Januari 2015, 15:29",
  dept_code: "24-Butchery",
  store: "036 - Tamini square",
  pt_name: "PT Trans Retail Indonesia",
  tgl_received: "Kamis, 15 Januari 2015, 15:29",
  address_store: "Jl. Lebak bulus No. 8 Gedung Carrefour Kebayoran Lama",
  npwp_store: "1115001435",
};

const CardInfoOrder = () => {
  return (
    <div>
      <CardInformation
        title={"Informasi Order"}
        column={columnCard}
        data={data}
      />
    </div>
  );
};

export default CardInfoOrder;
