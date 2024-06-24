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
    title: "Toko Transmart",
    object: "po",
    key: "store_code",
  },
  {
    title: "Nama Perusahaan",
    object: "po",
    key: "business_unit_name",
  },
  {
    title: "Alamat Perusahaan",
    object: "po",
    key: "business_unit_address",
  },
];

// const data = {
//   no_order: "915003095",
//   tgl_order: "Kamis, 15 Januari 2015, 15:29",
//   dept_code: "24-Butchery",
//   store: "036 - Tamini square",
//   pt_name: "PT Trans Retail Indonesia",
//   tgl_received: "Kamis, 15 Januari 2015, 15:29",
//   address_store: "Jl. Lebak bulus No. 8 Gedung Carrefour Kebayoran Lama",
//   npwp_store: "1115001435",
// };

const CardInfoOrder = ({ data }) => {
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
