import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode",
    key: "code",
  },
  {
    title: "Nama Perusahaan",
    key: "supp_name",
  },
  {
    title: "Alamat Perusahaan",
    key: "supp_address",
  },
  {
    title: "Kode Pos",
    key: "code_pos",
  },
  {
    title: "Kota",
    key: "kota",
  },
  {
    title: "Negara",
    key: "negara",
  },
  {
    title: "Nama",
    key: "name",
  },
  {
    title: "Telepon",
    key: "telp",
  },
  {
    title: "Fax",
    key: "fax",
  },
  {
    title: "NPWP",
    key: "npwp_supp",
  },
  {
    title: "Email",
    key: "email_supp",
  },
];

// const data = {
//   code: "O399",
//   supp_name: "JKT MON DELI INDONESIA, PT",
//   supp_address: "Jl. Gajah Mada No. 19",
//   code_pos: "111234",
//   kota: "Jakarta Barat",
//   negara: "Indonesia",
//   name: "PT. GRAMEDIA ASRI MEDIA",
//   fax: "021-75889355",
//   telp: "021-7564823",
//   npwp_supp: "1115001435",
//   email: "",
// };

const CardInfoSupplier = ({ data }) => {
  return (
    <div>
      <CardInformation
        title={"Informasi Supplier"}
        subTitle={"JKT MON DELI INDONESIA, PT"}
        column={columnCard}
        data={data}
        showEditButton={true}
      />
    </div>
  );
};

export default CardInfoSupplier;
