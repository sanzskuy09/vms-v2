import React from "react";
import CardInformation from "@/components/CardInformation";

const columnCard = [
  {
    title: "Kode",
    key: "supplier_code",
  },
  {
    title: "Nama Perusahaan",
    key: "company_name",
  },
  {
    title: "Alamat Perusahaan",
    key: "company_address1",
  },
  {
    title: "Kode Pos",
    key: "postal_code",
  },
  {
    title: "Kota",
    key: "city",
  },
  {
    title: "Negara",
    key: "country",
  },
  {
    title: "Nama",
    key: "name",
  },
  {
    title: "Telepon",
    key: "telephone_number",
  },
  {
    title: "Fax",
    key: "fax",
  },
  {
    title: "Email",
    key: "email",
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
        subTitle={data?.company_name}
        column={columnCard}
        data={data}
        showEditButton={true}
      />
    </div>
  );
};

export default CardInfoSupplier;
